const db = require('../db/index')
const path = require('path')
const util = require('util')
const { PipeLifecycleController } = require('./PipeLifecycleController')


class PipelineNode {
    /**
     * 
     * @param {string} id ID of Node in the DB
     * @param {string} tag TAG identifier for the module
     * @param {Pipeline} pipe ID of the pipe in the DB
     * @param {string} type Type of the node
     * @param {NodeConnector[]} inputConnectors List of Input Connectors
     * @param {NodeParameter[]} inputParams List of parameters that this node can accept
     * @param {NodeConnector[]} outputConnectors List of connectors for success
     * @param {NodeParameter[]} outputParams List of parameters that this node can send on success
     * @param {NodeConnector[]} errorConnectors List of connectors for error
     * @param {NodeParameter[]} errorParams List of parameters that this Node can send on error
     * @param {NodeParameter[]} i_params Parameters that this node has reccived
     * @param {NodeParameter[]} o_params Parameter that this node has send
     * @param {NodeParameter[]} properties Properties saved by the module
     * @param {number} status Status of the PipelineNode
     * @param {WebWardModule} mod Reference to the WebWardModule to avoid having to look for it all the time
     */
    constructor(
        id, tag, pipe, type, inputConnectors, inputParams,
        outputConnectors, outputParams, errorConnectors, errorParams,
        i_params, o_params, properties, status, mod
    ) {
        this.id = id;
        this.tag = tag;
        this.pipe = pipe;
        this.type = type;
        this.inputConnectors = inputConnectors;
        /**
         * List of parameters that this node can accept
         * @type {NodeParameter[]}
         */
        this.inputParams = inputParams ? inputParams : [];
        this.outputConnectors = outputConnectors;
        /**
         * List of parameters that this node emits
         * @type {NodeParameter[]}
         */
        this.outputParams = outputParams ? outputParams : [];
        this.errorConnectors = errorConnectors;
        /**
         * List of parameters that this node emits on error
         * @type {NodeParameter[]}
         */
        this.errorParams = errorParams ? errorParams : [];
        this.i_params = i_params ? i_params : [];
        this.o_params = o_params ? o_params : [];
        this.status = status;
        /**
         * Persistent properties saved by the module
         * @type {NodeParameter[]}
         */
        this.properties = properties ? properties : [];
        /**
         * List of nodes to send success
         * @type {PipelineNode[]}
         */
        this.outputNodes = [];
        /**
         * List of nodes to send errors
         * @type {PipelineNode[]}
         */
        this.errorNodes = [];
        /**
         * Reference to the WebWardModule to avoid having to look for it all the time
         * @type {WebWardModule}
         */
        this.mod = mod;
        /**
         * Starting date of the module
         * @type {Date}
         */
        this.start_date = null;
        /**
         * End date of the module
         * @type {Date}
         */
        this.end_date = null;
        /**
         * When this node was last modified by a module
         * @type {number}
         */
        this.last_execution = Date.now();

    }
    toJSON() {
        let ret = {};
        ret.id = this.id;
        ret.name = this.name;
        ret.type = this.type;
        ret.tag = this.tag;
        ret.y = this.y;
        ret.x = this.x;
        ret.width = this.width;
        ret.height = this.height;
        ret.pipe = this.pipe;
        ret.inputParams = this.inputParams;
        ret.outputParams = this.outputParams;
        ret.errorParams = this.errorParams;
        ret.properties = this.properties;
        ret.inputConnectors = this.inputConnectors.map((val, i, arr) => {
            return val.toJSON();
        })
        ret.outputConnectors = this.outputConnectors.map((val, i, arr) => {
            return val.toJSON();
        })
        ret.errorConnectors = this.errorConnectors.map((val, i, arr) => {
            return val.toJSON();
        })
        return ret;

    }
    /**
     * Fill all connectors of the node with references to other nodes and other connectors
     * @param {PipelineNode[]} array 
     */
    fillReferences(array) {
        //FIRST INPUT
        for (let i = 0; i < this.inputConnectors.length; i++) {//Cada Conector de entrada nuestro
            let connecteds = this.inputConnectors[i].conectedNodes;
            let us_in_connector = this.inputConnectors[i];//Nuestro conector de entrada
            us_in_connector.conectedNodes = [];
            for (let i_c = 0; i_c < connecteds.length; i_c++) {//Cada conectado a nuestro conector
                //El conector unido al nuestro
                let his_connector_toUs = connecteds[i_c];
                //Obtenemos referencia real al nodo
                let pipNode = findNodeInArray(array, his_connector_toUs.originNode ? his_connector_toUs.originNode.id : "");//Nodo conectado
                if (pipNode) {
                    //conRef = OutputConnectors or ErrorConnectors
                    let connectorsOfConectedToUs = his_connector_toUs.type === 1 ?
                        pipNode.outputConnectors : his_connector_toUs.type === 2 ?
                            pipNode.errorConnectors : [];
                    let findConector = false;
                    for (let i_pnc = 0; i_pnc < connectorsOfConectedToUs.length; i_pnc++) {
                        //Buscar conector del nodo conectado
                        let outOrErr = connectorsOfConectedToUs[i_pnc];
                        if (outOrErr.id === his_connector_toUs.id) {
                            //We exists in the other node
                            findConector = true;
                            us_in_connector.addConnector(outOrErr)
                            outOrErr.addConnector(us_in_connector)
                            break;
                        }
                    }
                    if (!findConector) {//We cant find the connector
                        connecteds.splice(i_c, 1);
                        i_c--;
                    }
                } else {
                    //Nodo no encontrado
                    connecteds.splice(i_c, 1);
                    i_c--;
                }
            }
        }
        //We took the nodes from our input connectors only
        for (let conector of this.inputConnectors) {
            for (let nodeConector of conector.conectedNodes) {
                if (nodeConector.type === IO_TYPES.ERR) {
                    nodeConector.originNode.errorNodes.push(this);
                } else if (nodeConector.type === IO_TYPES.OUTPUT) {
                    nodeConector.originNode.outputNodes.push(this);
                }

            }
        }
    }

    /**
     * Someone notifies me that i can do my job
     */
    doJob(cb) {
        try {
            if (cb) {
                this.mod.run(this, cb);
            } else {
                this.mod.run(this);
            }
        } catch (err) { }
    }

    /**
     * Assign NodeParameters to the output of this node
     * @param {NodeParameter[]} params List of parameters to be in the node output parameters
     * To be done by the logic of the module
     */
    assignOutputParameters(params) {
        this.addOutParameters(params);
        this.setAsSuccess();
    }


    /**
     * Assign NodeParameters to the input of this node
     * @param {NodeParameter[]} params List of parameters to be in the node input parameters
     */
    assignInputParameters(params) {
        if (this.status === PIPELINE_STATUS.WAITING) {
            //Nodo esperando
            this.status = PIPELINE_STATUS.STARTED;
        } else {
            let param;
            if ((param = this.getParameter('_RECALL'))) {
                //Can be recalled
                if (param.type === 'boolean' && param.value === 'true') {
                    this.status = PIPELINE_STATUS.STARTED;
                    return;
                }
            } else if ((param = this.getParameter('_FORCES_END'))) {
                //Ends the pipeline
                if (param.type === 'boolean' && param.value === 'true') {
                    this.status = PIPELINE_STATUS.END;
                    this.pipe.controller.forcePipelineEnd(this);
                    return;
                }
            } else if ((param = this.getParameter('_FORCES_RESTART'))) {
                //Restarts the pipeline
                if (param.type === 'boolean' && param.value === 'true') {
                    this.status = PIPELINE_STATUS.SUCCESS;
                    this.pipe.controller.restartPipeline(this);
                    return;
                }
            }
        }

        //Assignin parameters
        copyParameters(this.inputParams, params, this.i_params)
        //Check if we can start
        if (this.checkEnoughInputParameters()) {
            this.status = PIPELINE_STATUS.STARTED;
        }
    }
    /**
     * Marks this node as a success
     */
    setAsSuccess() {
        if (this.status === PIPELINE_STATUS.STARTED) {
            //Notify the controller that i completed my job
            this.status = PIPELINE_STATUS.SUCCESS;
            let param;
            if ((param = this.getParameter('_FORCES_END'))) {
                //Ends the pipeline
                if (param.type === 'boolean' && param.value === 'true') {
                    this.status = PIPELINE_STATUS.END;
                    this.pipe.controller.forcePipelineEnd(this);
                    return;
                }
            } else {
                if (this.pipe.controller) {
                    this.pipe.controller.iEndSuccessfully(this);
                } else {
                    //No controller?
                }

            }
        }
    }
    /**
     * This node notifies his next output nodes but he wants to remaing as started
     */
    setAsEndButStarted() {
        if (this.status === PIPELINE_STATUS.STARTED) {
            //Notify the controller that i completed my job
            let param;
            if ((param = this.getParameter('_FORCES_END'))) {
                //Ends the pipeline
                if (param.type === 'boolean' && param.value === 'true') {
                    this.status = PIPELINE_STATUS.END;
                    this.pipe.controller.forcePipelineEnd(this);
                    return;
                }
            } else {
                if (this.pipe.controller) {
                    this.pipe.controller.iEndButRemaingStarted(this);
                } else {
                    //No controller?
                }

            }
        }
    }
    /**
     * Assign NodeParameters to the output error of this node and ends the node job as error.
     * @param {NodeParameter[]} params List of parameters to be in the node error parameters
     */
    assignErrorParameters(params) {
        this.addOutParameters(params);
        this.setAsError();
    }
    /**
     * Adds output parameters to the node
     * @param {NodeParameter[]} params 
     */
    addOutParameters(params) {
        if (params) {
            copyParameters(this.outputParams, params, this.o_params)
        }
    }
    /**
     * Adds error parameters to the node
     * @param {NodeParameter[]} params 
     */
    addErrParameters(params) {
        if (params) {
            copyParameters(this.errorParams, params, this.o_params)
        }
    }
    /**
     * The node failed his job.
     */
    setAsError() {
        if (this.status === PIPELINE_STATUS.STARTED) {
            //Notify the controller that i completed my job
            this.status = PIPELINE_STATUS.ERROR;
            let param;
            if ((param = this.getParameter('_FORCES_END'))) {
                //Ends the pipeline
                if (param.type === 'boolean' && param.value === 'true') {
                    this.status = PIPELINE_STATUS.END;
                    this.pipe.controller.forcePipelineEnd(this);
                    return;
                }
            } else {
                this.pipe.controller.iGetAnError(this);
            }
        }
    }

    /**
     * Add properties to this node
     * @param {NodeParameter[]} params The parameters the module needs to store in DB
     */
    addNodeProperties(params) {
        copyParameters([], util.isArray(params) ? params : [params], this.properties)
    }
    /**
     * To store persistent data across the sessions.
     * Notify the controller that i need to save data
     */
    saveNode() {
        //Notify the controller that i need to save data
        if (this.pipe.controller) {
            this.pipe.controller.iNeedToSaveData(this);
        }
    }
    /**
     * Checks if the node has sufficient node parameters tos start running
     */
    checkEnoughInputParameters() {
        if (this.inputParams.length === 0) {
            return true;
        }
        let availableParams = this.i_params.copyWithin([]);
        /** 
         * Parameters that are not assigned but maybe can be asigned later
         * @type {NodeParameter[]}
        */
        let notAsignedParams = [];
        /** 
         * Parameters that must be in the i_params
         * @type {NodeParameter[]}
        */
        let neededParameters = [];

        for (let param of this.inputParams) {
            if (!param.optional) {
                neededParameters.push(param);
            }
        }
        for (let i = 0; i < neededParameters.length; i++) {
            let needParam = neededParameters[i];
            for (let j = 0; j < availableParams.length; j++) {
                let auxParam = availableParams[j];
                if (auxParam.type === needParam.type) {
                    if (auxParam.name === needParam.name) {
                        neededParameters.splice(i, 1);
                        i--;
                        break;
                    } else {
                        notAsignedParams.push(auxParam)
                        break;
                    }
                }
            }
        }
        for (let i = 0; i < neededParameters.length; i++) {
            let needParam = neededParameters[i];
            for (let j = 0; j < notAsignedParams.length; j++) {
                let auxParam = notAsignedParams[j];
                if (auxParam.type === needParam.type) {
                    neededParameters.splice(i, 1);
                    notAsignedParams.splice(j, 1);
                    i--;
                    break;
                }
            }
        }
        if (neededParameters.length > 0) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * Obtrain a persistent parameter from properties and inputs of a certain node
     * @param {string} name 
     */
    getParameter(name) {
        for (let prop of this.properties) {
            if (prop.name === name) {
                return prop;
            }
        }
        for (let prop of this.i_params) {
            if (prop.name === name) {
                return prop;
            }
        }
        return null;
    }
    /**
     * Obtrain a persistent property of a certain node
     * @param {string} name 
     */
    getProperty(name) {
        for (let prop of this.properties) {
            if (prop.name === name) {
                return prop;
            }
        }
        return null;
    }
    removeProperty(name) {
        for (let i=0; i < this.properties.length; i++) {
            if ( this.properties[i].name === name) {
                this.properties.splice(i,1)
                return;
            }
        }
    }
    setInputConnectors(connectors) {
        this.inputConnectors = connectors;
    }
    setOutputConnectors(connectors) {
        this.outputConnectors = connectors;
    }
    setErrorConnectors(connectors) {
        this.errorConnectors = connectors;
    }
}
/**
 * 
 * @param {PipelineNode[]} array 
 * @param {string} nodeID 
 * @returns {PipelineNode}
 */
function findNodeInArray(array, nodeID) {
    for (let node of array) {
        if (node.id === nodeID) {
            return node;
        }
    }
    return null;
}

function pipelineNodeFromJSON(data) {
    let node = new PipelineNode(data.name, data.tag, data.pipe, data.type, data.inputConnectors, data.inputParams, data.outputConnectors, data.outputParams, data.errorConnectors, data.errorParams, data.i_params, data.o_params, data.properties, data.status, data.mod);
    if (data.id)
        node.id = data.id;
    if (data.outputParams)
        node.outputParams = data.outputParams;
    if (data.inputParams)
        node.inputParams = data.inputParams;
    if (data.errorParams)
        node.errorParams = data.errorParams;
    if (data.x && typeof data.x === 'number')
        node.x = data.x;
    if (data.y && typeof data.y === 'number')
        node.y = data.y;
    if (data.height && typeof data.height === 'number')
        node.height = data.height;
    if (data.width && typeof data.width === 'number')
        node.width = data.width;
    if (data.pipe)
        node.pipe = data.pipe;
    if (data.start_date)
        node.start_date = new Date(data.start_date)
    if (data.end_date)
        node.end_date = new Date(data.end_date)
    if (data.inputConnectors)
        node.inputConnectors = connectorsFromJSONarray(data.inputConnectors, 0, node);
    if (data.outputConnectors)
        node.outputConnectors = connectorsFromJSONarray(data.outputConnectors, 1, node);
    if (data.errorConnectors)
        node.errorConnectors = connectorsFromJSONarray(data.errorConnectors, 2, node);
    return node;
}

/**
 * This represents a connector used to connect one node (original) to other nodes.
 */
class NodeConnector {
    /**
     * 
     * @param {number} id 
     * @param {number} type 
     * @param {PipelineNode} originNode 
     * @param {NodeConnector[]} conectedNodes 
     */
    constructor(id, type, originNode, conectedNodes) {
        this.id = id;
        this.type = type;
        this.originNode = originNode;
        this.conectedNodes = conectedNodes ? conectedNodes : [];
    }
    toJSON() {
        let ret = {};
        ret.id = this.id;
        ret.conectedNodes = this.conectedNodes.map((val, i, arr) => {
            let aux = {};
            aux.id = val.id;
            aux.type = val.type
            aux.originNode = val.originNode.id;
            return aux;
        });
        return ret;
    }

    /**
     * Añade un conector a nuestra lista. Devuelve true si lo logra y si no false.
     * @param {NodeConnector} con 
     */
    addConnector(con) {
        for (let i = 0; i < this.conectedNodes.length; i++) {
            if (this.conectedNodes[i].id === con.id) {
                this.conectedNodes[i] = con;
                return false;
            }
        }
        if (this.type === IO_TYPES.INPUT && (con.type === IO_TYPES.ERR || con.type === IO_TYPES.OUTPUT)) {
            this.conectedNodes.push(con);
            return true;
        } else if (con.type === IO_TYPES.INPUT && (this.type === IO_TYPES.ERR || this.type === IO_TYPES.OUTPUT)) {
            this.conectedNodes.push(con);
            return true;
        }
    }
}
function connectorsFromJSONarray(array, type, originNode) {
    let conectors = [];
    for (let i = 0; i < array.length; i++) {
        conectors.push(nodeConnectorFromJSON(array[i], originNode, type))
    }
    return conectors;
}

function nodeConnectorFromJSON(data, originNode, type) {
    let aux = new NodeConnector(data.id ? data.id : generateIdForConnector(), type, originNode, []);
    aux.x = data.x || 0;
    aux.y = data.y || 0;
    if (originNode)
        aux.originNode = originNode;
    if (data.conectedNodes) {
        aux.conectedNodes = data.conectedNodes.map((val, i, arr) => {
            let ret = new NodeConnector();
            ret.id = val.id ? val.id : generateIdForConnector();
            ret.type = val.type;
            if (typeof val.originNode === 'string') {
                ret.originNode = new PipelineNode("", "");
                ret.originNode.id = val.originNode;
            }
            return ret;
        });
    }
    return aux;
}
function generateIdForConnector() {
    return Date.now().toString(36).substring(6, 15) + Math.random().toString(36).substring(2, 7);
}

class NodeParameter {
    /**
     * 
     * @param {string} name Name of this parameter 
     * @param {string} type Type of parameter
     * @param {string} value Value of the parameter
     * @param {boolean} optional Is optional
     */
    constructor(name, type, value, optional = false) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.optional = optional;
    }
}
/**
 * Logic behind a Pipeline
 * 
 * 
 * 
 * 
 */
class Pipeline {
    /**
     * 
     * @param {string} id 
     * @param {number} status 
     * @param {Date} last_update 
     * @param {Date} acquire_date 
     * @param {string} owner 
     * @param {string} web_project 
     * @param {Date} start_date 
     * @param {Date} end_date 
     * @param {PipeLifecycleController} controller
     */
    constructor(id, status, last_update, acquire_date, owner, web_project, start_date, end_date, controller) {
        this.id = id;
        this.status = status;
        this.last_update = last_update;
        this.start_date = start_date;
        this.end_date = end_date;
        /**
         * @type {PipelineNode[]}
         */
        this.nodes = [];
        this.acquire_date = acquire_date;
        this.owner = owner;
        this.web_project = web_project;
        /**
         * Controller of the pipeline
         * @type {PipeLifecycleController}
         */
        this.controller = controller;
    }
}
/**
 * Copy all the allowed parameters form o_params into i_params
 * @param {NodeParameter[]} allowedParams 
 * @param {NodeParameter[]} o_params 
 * @param {NodeParameter[]} i_params 
 */
function copyParameters(allowedParams, o_params, i_params) {
    if (!(util.isArray(o_params) && util.isArray(i_params) && util.isArray(allowedParams)))
        throw Error("Params is not array")
    /** 
     * Parameters still availables
     * @type {NodeParameter[]}
    */
    let availableParameters = allowedParams.copyWithin([]);

    if (allowedParams.length === 0) {
        //No allowed parameters, so all the parameters are pased 
        for (let outParam of o_params) {
            assignNodeParameterToArray(outParam, i_params)
        }
        return;
    }
    /** 
     * Parameters that are not assigned but maybe can be asigned later
     * @type {NodeParameter[]}
    */
    let notAsignedParams = [];
    for (let outParam of o_params) {
        let found = false;
        let hasType = false;
        for (let i = 0; i < availableParameters.length; i++) {
            if (availableParameters[i].type === outParam.type) {
                hasType = true;
                if (availableParameters[i].name === outParam.name) {
                    //Remove parameter in the available list
                    availableParameters.splice(i, 1);
                    let pushParam = new NodeParameter(
                        availableParameters[i].name,
                        availableParameters[i].optional,
                        availableParameters[i].type,
                        outParam.value
                    );
                    assignNodeParameterToArray(pushParam, i_params)
                    found = true;
                    break;
                }
            }
        }
        if (!found && hasType) {
            notAsignedParams.push(outParam);
        }
    }
    //Still parameters not asigned
    if (notAsignedParams.length > 0) {
        for (let outParam of notAsignedParams) {
            for (let i = 0; i < availableParameters.length; i++) {
                if (availableParameters[i].type === outParam.type) {
                    //Remove parameter in the available list
                    availableParameters.splice(i, 1);
                    let pushParam = new NodeParameter(
                        availableParameters[i].name,
                        availableParameters[i].optional,
                        availableParameters[i].type,
                        outParam.value
                    );
                    assignNodeParameterToArray(pushParam, i_params)
                    break;
                }
            }
        }
    }
    //Still parameters? then set them to default
    if (availableParameters.length > 0) {
        for (let avParam of availableParameters) {
            assignNodeParameterToArray(avParam, i_params)
        }
    }
}

/**
 * Asign the value of a node parameter in a parameter list
 * @param {NodeParameter} i_param 
 * @param {NodeParameter[]} list 
 */
function assignNodeParameterToArray(i_param, list) {
    let ref;
    if (!(ref = list.find((val, i, arr) => {
        if (val.name === i_param.name)
            return true;
        return false;
    }))) {
        //Not in the list
        list.push(i_param);
    } else {
        Object.assign(ref, i_param)
    }
}

const PIPE_TAGS = {
    START: "START",
    INTEGRATION: "INTEGRATION",
    BUILDER: "BUILDER",
    DEPLOYER: "DEPLOYER",
    CHECKER: "CHECKER",
    ERROR_NOTIFIER: "ERROR_NOTIFIER",
    REPORT_NOTIFIER: "REPORT_NOTIFIER",
    ANY: "ANY",
    PERIODIC: "PERIODIC"
}
const IO_TYPES = {
    INPUT: 0,
    OUTPUT: 1,
    ERR: 2
}
const PIPELINE_STATUS = {
    WAITING: 0,
    STARTED: 1,
    SUCCESS: 2,
    ERROR: 3,
    END: 4,
    INACTIVE: 5
}
module.exports = {
    NodeConnector: NodeConnector,
    NodeParameter: NodeParameter,
    PipelineNode: PipelineNode,
    Pipeline: Pipeline,
    PIPELINE_STATUS: PIPELINE_STATUS,
    pipelineNodeFromJSON: pipelineNodeFromJSON,
    connectorsFromJSONarray: connectorsFromJSONarray
}