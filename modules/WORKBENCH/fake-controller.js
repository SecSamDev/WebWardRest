const { PIPELINE_STATUS } = require('../pipeline_status')
const { PipelineService } = require('../service')

class PipeLifecycleController {
    /**
     * 
     * @param {Pipeline} pipe The pipeline
     * @param {{query : Promise<>, getClient : Promise<>}} db Use a db interface for doing SQL queries
     * @param {number} timeout Time between pipeline updates
     * @param {Console} pipeConsole Loggin console for this Controller
     */
    constructor(pipe, db, timeout = 2, pipeConsole = console) {
        this.pipe = pipe;
        this.db = db;
        /**
         * Timeout in seconds
         */
        this.timeout = timeout;
        /**
         * Timeout in seconds
         */
        this.timeoutPIPE = timeout * 1;
        /**
         * Cancel all running modules
         */
        this.restarting = false;

        (this.pipe).controller = this;
        this.retries = 0;
        /**
         * Reference to the timer id used to execute Node Modules
         * @type {number}
         */
        this.time;

        /**
         * List of services registred by the nodes
         * @type {PipelineService[]}
         */
        this.services = [];

        /**
         *  Reference to the timer id used to notify of possession of pipeline
         * @type {number}
         */
        this.timerPipeline;
        /**
         *  Reference to the timer id used to run periodic Nodes
         * @type {number}
         */
        this.timerPeriodics
        this.pipeConsole = pipeConsole;
        //If no console provider, then null functions
        if (!this.pipeConsole || this.pipeConsole === null || this.pipeConsole === undefined)
            this.pipeConsole = {
                log: (data) => { },
                error: (data) => { },
            };
    }

    /**
     * All nodes that are started needs to do their job
     */
    runNodes() {
        if (this.pipe.status !== PIPELINE_STATUS.INACTIVE) {
            let initTime = Date.now();
            for (let node of this.pipe.nodes) {
                if (node && node.status === PIPELINE_STATUS.STARTED && node.type !== PIPE_TAGS.PERIODIC) {
                    //Only running nodes need to run in VM
                    this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: RUN NODE ${node.tag}-${node.status}-${node.id}`)
                    node.doJob(() => {
                        this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: CALLBACK NODE ${node.tag}:${node.status}:${node.id} TOTAL DURATION=${Date.now() - initTime}ms`);
                    });
                }
            }
            let diffTime = Date.now() - initTime;
            this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: CYCLE ${initTime} DURATION ${diffTime}ms`)
        }
    }
    /**
     * A node has an error, so it notifies the controller and the controller calls the nexts nodes.
     * @param {PipelineNode} node A reference to the node that has the error.
     */
    iGetAnError(node) {
        this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: ERROR IN NODE ${node.tag}`);
        if (node.errorNodes.length === 0) {
            node.status = PIPELINE_STATUS.ERROR;
            //Save node status with i_params and o_params in DB
            this.iNeedToSaveData(node);
        } else {
            for (let nextNode of node.errorNodes) {
                nextNode.assignInputParameters(node.o_params);
                this.pipe.last_update = new Date(Date.now());
                //Save the node state to not lose data
                this.iNeedToSaveData(nextNode);
            }
            node.status = PIPELINE_STATUS.ERROR;
        }
    }
    /**
     * A node has ended so it notifies his controller and the controller wakes up the next nodes.
     * @param {PipelineNode} node A reference to the node that has end with success.
     */
    iEndSuccessfully(node) {
        if (node.outputNodes.length === 0) {
            node.status = PIPELINE_STATUS.SUCCESS;
            //Save node status with i_params and o_params in DB
            this.iNeedToSaveData(node);
        } else {
            for (let nextNode of node.outputNodes) {
                nextNode.assignInputParameters(node.o_params);
                this.pipe.last_update = new Date(Date.now());
                //Save the node state to not lose data
                this.iNeedToSaveData(nextNode);
            }
            node.status = PIPELINE_STATUS.SUCCESS;
            //Save node status with i_params and o_params in DB
            this.iNeedToSaveData(node);
        }
    }
    /**
     * The node has ended his job, but he doesnt want to be terminated and wants to still be as started.
     * @param {PipelineNode} node 
     */
    iEndButRemaingStarted(node) {
        for (let nextNode of node.outputNodes) {
            nextNode.assignInputParameters(node.o_params);
        }
        node.status = PIPELINE_STATUS.STARTED;
        this.iNeedToSaveData(node);
    }
    /**
     * A node need to save his parameters, i_params and o_params in the DB
     * @param {PipelineNode} node 
     */
    iNeedToSaveData(node) {
        this.pipeConsole.log(`${Date.now()} :: Saving status of node ${node.id}`)
        try{
            this.pipeConsole.log(JSON.stringify(node,null,"\t"))
        }catch(err){}
    }
    forcePipelineEnd(node) {
        //Only a  node with _FORCES_END parameter can finish the lifecycle
        if (node.type === 'START' && node.getParameter('_FORCES_END')) {
            this.pipe.status = PIPELINE_STATUS.END;
            for (let i = 0; i < 3; i++) {
                updatePipeline(pipe).then(() => {
                    i = 3;
                    break;
                }).catch(err => { })
            }
        }
    }
    /**
     * A START node notifies the controller that has been activated and the controller restarts the pipeline lifecycle
     * @param {PipelineNode} node 
     */
    restartPipeline(node) {
        //Only a START node with _FORCES_RESTART parameter can restart the pipeline
        if (node.type === 'START' && node.getParameter('_FORCES_RESTART')) {
            this.pipe.status = PIPELINE_STATUS.STARTED;
            for (let node of this.pipe.nodes) {
                if (node.type !== 'START') {
                    //Los START nodes no se reinician
                    node.status = PIPELINE_STATUS.WAITING;
                    node.i_params = [];
                    node.o_params = [];
                }
            }
            //Retries updating the pipeline
            for (let i = 0; i < 3; i++) {
                updatePipeline(pipe).then(() => {
                    i = 3;
                    break;
                }).catch(err => { })
            }

        }
    }
    /**
     * Removes all the i_params and o_params of the nodes and puts them all to Waiting
     */
    clearPipeline() {
        for (let node of this.pipe.nodes) {
            node.status = PIPELINE_STATUS.WAITING;
            node.i_params = [];
            node.o_params = [];
            this.pipe.last_update = new Date(Date.now());
            //Only let private properties (properties that starts with _)
            node.properties = node.properties.filter((val, i, arr) => {
                if (val.name.charAt(0) === '_') {
                    return true;
                }
                return false;
            });
        }
    }
    /**
     * A node notifies me that can start doing job
     * @param {PipelineNode} node A reference to the node that wants to start doing his job
     */
    iCanStart(node) {
        node.doJob();
    }
    /**
     * 
     * @param {PipelineNode} node 
     * @param {string} name 
     * @param {*} object 
     */
    registerService(node, name, object) {
        let found = this.services.find((val) => {
            if (val.node && val.node.id === node.id) {
                if (val.node !== node) {
                    //Distinct object, update reference
                    val.node = node;
                }
                if (val.name.toLowerCase() === name.toLowerCase()) {
                    return true;
                }
            }
            return false;
        })
        if (found && found.name) {
            return false;
        } else {
            this.services.push(new PipelineService(name, node, object))
            return true;
        }
    }
    /**
     * 
     * @param {PipelineNode} node 
     * @param {string} name 
     */
    getService(node, name) {
        let found = this.services.find((val) => {
            if (val.node && val.node.id === node.id) {
                if (val.node !== node) {
                    //Distinct object, update reference
                    val.node = node;
                }
                if (val.name.toLowerCase() === name.toLowerCase()) {
                    return true;
                }
            }
            return false;
        })
        if (found) {
            return found.objeto;
        }else{
            return null;
        }
        
    }
}

/**
 * Finds the last updates of a node in the DB
 * @param {PipelineNode} node 
 */
async function getLastUpdateNode(node) {
    this.pipeConsole.log(`${Date.now()} :: getLastUpdateNode ${node.id}`)
}
/**
 * Update a pipeline and a list of nodes
 * @param {Pipeline} pipe 
 * @param {PipelineNode[]} nodes 
 */
async function updatePipeline(pipe, nodes = []) {
    this.pipeConsole.log(`${Date.now()} :: Saving status of pipeline ${pipe.id}`)
}


/**
 * 
 * @param {*} data 
 * @returns {PipelineNode}
 */
function mapDataDBToNode(data) {
    let pipe;
    try {
        let i_params = [];
        if (data.io_params && data.io_params.i_params)
            i_params = data.io_params.i_params;
        let o_params = [];
        if (data.io_params && data.io_params.o_params)
            o_params = data.io_params.o_params;
        pipe = new PipelineNode(
            data.id, data.tag, data.pipe, data.type, data.data.inputConnectors,
            data.data.inputParams, data.data.outputConnectors, data.data.outputParams,
            data.data.errorConnectors, data.data.errorParams, i_params, o_params,
            data.data.properties, data.status, null);
        pipe.end_date = new Date(data.end_date);
        pipe.start_date = new Date(data.start_date);
    } catch (err) {
        throw err;
    }
    return pipe;
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
exports.PipeLifecycleController = PipeLifecycleController;