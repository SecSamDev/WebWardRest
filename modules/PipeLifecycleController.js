const PIPELINE_STATUS = {
    WAITING: 0,
    STARTED: 1,
    SUCCESS: 2,
    ERROR: 3,
    END: 4,
    INACTIVE: 5
};
const { PipelineService } = require('./service')
const { PipelineNode, NodeParameter, NodeConnector, Pipeline } = require('./pipeline')

const db = require('../db/index');
const { findModuleInLibrary } = require('./module_library');

const util = require('util')




/**
 * Controls the lifecycle of a pipeline, and the intercomunication of the nodes of the pipeline.
 */
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

        this.setTimers();
    }
    setTimers() {
        if (this.timer)
            clearInterval(this.timer);
        if (this.timerPipeline)
            clearInterval(this.timerPipeline)
        this.timer = setInterval(this.runNodes.bind(this), this.timeout * 1000);
        //Very Slow Periodic Nodes
        this.timerPeriodics = setInterval(this.runNodesPERIODICS.bind(this), this.timeoutPIPE * 5000);
        this.timerPipeline = setInterval(this.notifyAcquiredPipeline.bind(this), this.timeoutPIPE * 1000);
    }

    async getAllNodes() {
        let getNodes = await db.query(`
            SELECT *
            FROM pipeline_nodes
            WHERE pipe=$1;
        `, [this.pipe.id]);
        this.pipe.nodes = getNodes.rows.map((val, i, arr) => {
            try {
                return pipelineNodeFromJSON(mapDataDBToNode(val));
            } catch (err) {
                return;
            }

        });
        //Fill with modules
        for (let node of this.pipe.nodes) {
            try {
                node.mod = findModuleInLibrary(node.tag);
                node.pipe = this.pipe;
                node.fillReferences(this.pipe.nodes);
            } catch (err) { }
        }
    }
    killController() {
        this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: KILLING CONTROLLER`)
        if (this.timer)
            clearInterval(this.timer);
        if (this.timerPipeline)
            clearInterval(this.timerPipeline);
        if (this.timerPeriodics)
            clearInterval(this.timerPeriodics);
    }
    /**
     * Update the acquired time in the DB
     */
    notifyAcquiredPipeline() {
        this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: NOTIFY OWNING PIPELINE`)
        this.db.query(`
            UPDATE 
                pipelines
            SET 
                status = 
                    CASE 
                        WHEN last_update > $1
                        THEN status 
                        ELSE $3
                    END,
                acquire_date=current_timestamp,
                last_update =
                    CASE 
                        WHEN last_update > $1
                        THEN last_update 
                        ELSE $1
                    END
            WHERE
                id=$2
                AND cluster_owner='${process.title}'
            RETURNING *;
        `, [this.pipe.last_update,this.pipe.id,this.pipe.status])
            .then(dbRes => {
                try {
                    let result = obtainResultFromUpdate(dbRes);
                    if (result) {
                        //Check last_update
                        let row = result.rows[0];
                        if (this.pipe.last_update < new Date(row.last_update)) {
                            this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: PIPE UPDATED`)
                            //Pipeline updated in DB
                            this.pipe.last_update = new Date(row.last_update);
                            if (this.pipe.status !== row.status) {
                                this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: CHANGE IN STATUS`)
                                //Distinct status so update lifecycle

                                this.pipe.status = row.status;
                                if (this.pipe.status === PIPELINE_STATUS.INACTIVE) {
                                    //Clear all the pipeline but we keep it
                                    this.clearPipeline();
                                } else if (this.pipe.status === PIPELINE_STATUS.END) {
                                    //Stops the pipeline lifecycle
                                    for (let node of this.pipe.nodes) {
                                        if (node.type !== 'START') {
                                            //Los START nodes no se reinician
                                            node.status = PIPELINE_STATUS.WAITING;
                                            node.i_params = [];
                                            node.o_params = [];
                                        }
                                    }
                                    let pipe = this.pipe;
                                    updatePipeline(pipe, pipe.nodes).then(() => {
                                    }).catch(err => {
                                        updatePipeline(pipe, this.pipe.nodes).then(() => {
                                        }).catch(err => {
                                            updatePipeline(pipe, this.pipe.nodes).then(() => {
                                            }).catch(err => {

                                            })
                                        })
                                    })
                                } else if (this.pipe.status === PIPELINE_STATUS.STARTED || this.pipe.status === PIPELINE_STATUS.WAITING) {
                                    //STARTED so UPDATE nodes
                                    this.killController();
                                    this.getAllNodes().then(() => {
                                        //Restart pipeline
                                        this.setTimers();
                                    }, err => {
                                        //Restart pipeline
                                        console.log(err)
                                        this.setTimers();
                                    })
                                }
                            } else {
                                //Same status so maybe a START node has been update
                                let restart = false;
                                for (let node of this.pipe.nodes) {
                                    let lastStatus = node.status;
                                    //Obtain the last update of the node
                                    getLastUpdateNode(node).then(() => {
                                        if (node.type === 'START' && lastStatus !== node.status) {
                                            this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: NODE ${node.id} NEW STATUS ${node.status}`)
                                            //Status has changed so check the new status and notify next nodes
                                            if (node.status === PIPELINE_STATUS.SUCCESS) {
                                                this.iEndSuccessfully(node);
                                            } else if (node.status === PIPELINE_STATUS.ERROR) {
                                                this.iGetAnError(node)
                                            } else if (node.status === PIPELINE_STATUS.STARTED) {
                                                let param;
                                                if ((param = node.getParameter('_FORCES_RESTART'))) {
                                                    if (param === 'true') {
                                                        restart = true;
                                                        this.restartPipeline(node);
                                                    }
                                                }
                                            }
                                        }
                                    }).catch(err => { })
                                }
                            }
                        }
                    } else {
                        //Pipeline not updated... kill controller
                        this.killController();
                    }
                } catch (err) {
                    this.killController();
                }
            }).catch(err => {
                this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} ::ERROR ${err.toString()}`)
                //Not access to the DB
                this.retries++;
                if (this.retries > 3) {
                    this.killController();
                }
            })
    }
    /**
     * All nodes that are started needs to do their job
     */
    runNodes() {
        if (this.pipe.status !== PIPELINE_STATUS.INACTIVE) {
            let initTime = Date.now();
            let executeOne = false;
            for (let node of this.pipe.nodes) {
                if (node && node.status === PIPELINE_STATUS.STARTED && node.type !== PIPE_TAGS.PERIODIC) {
                    //Only running nodes need to run in VM
                    this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: RUN NODE ${node.tag}-${node.status}-${node.id}`)
                    node.doJob(() => {
                        this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: CALLBACK NODE ${node.tag}:${node.status}:${node.id} TOTAL DURATION=${Date.now() - initTime}ms`);
                    });
                    executeOne = true;
                }
            }
            let diffTime = Date.now() - initTime;
            if (executeOne) {
                this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: CYCLE ${initTime} DURATION ${diffTime}ms`)
            }
            if (diffTime > (this.timerPipeline * 1000)) {
                //Time betwen running cycles too long so kill this controller
                this.killController();
            }
        }
    }
    /**
     * Run periodic nodes. This function is executed from time to time. Used by SCHEDULERS.
     */
    runNodesPERIODICS() {
        if (this.pipe.status !== PIPELINE_STATUS.INACTIVE) {
            let initTime = Date.now();
            let executeOne = false;
            for (let node of this.pipe.nodes) {
                if (node && node.type === PIPE_TAGS.PERIODIC) {
                    //Only periodic nodes
                    this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: RUN NODE ${node.tag}-${node.status}-${node.id}`)
                    node.doJob(() => {
                        this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: CALLBACK NODE ${node.tag}:${node.status}:${node.id} TOTAL DURATION=${Date.now() - initTime}ms`);
                    });
                }
            }
            let diffTime = Date.now() - initTime;
            if (executeOne) {
                this.pipeConsole.log(`${Date.now()} :: ${this.pipe.id} :: PERIODIC ${initTime} DURATION ${diffTime}ms`)
            }

        }
    }
    /**
     * A node has an error, so it notifies the controller and the controller calls the nexts nodes.
     * @param {PipelineNode} node A reference to the node that has the error.
     */
    iGetAnError(node) {
        if (node.errorNodes.length === 0) {
            node.status = PIPELINE_STATUS.ERROR;
            //Save node status with i_params and o_params in DB
            this.iNeedToSaveData(node);
        } else {
            db.getClient().then(async (client) => {
                //We can speed up the process, but we want fiability to store all the changes
                await client.query('BEGIN');
                try {
                    console.log("Node end error: ")
                    console.log(node.o_params)
                    for (let nextNode of node.errorNodes) {
                        nextNode.assignInputParameters(node.o_params);
                        this.pipe.last_update = new Date(Date.now());
                        //Save the node state to not lose data
                        this.iNeedToSaveData(nextNode, client);
                    }
                    node.status = PIPELINE_STATUS.ERROR;
                    //Save node status with i_params and o_params in DB
                    //Clean out params and i_params
                    node.i_params = [];
                    node.o_params = [];
                    this.iNeedToSaveData(node, client);
                    await client.query('COMMIT');
                } catch (err) {
                    await client.query('ROLLBACK');
                } finally {
                    client.release();
                }
            }).catch(err => { });
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
            db.getClient().then(async (client) => {
                //We can speed up the process, but we want fiability to store all the changes
                await client.query('BEGIN');
                try {
                    for (let nextNode of node.outputNodes) {
                        nextNode.assignInputParameters(node.o_params);
                        this.pipe.last_update = new Date(Date.now());
                        //Save the node state to not lose data
                        this.iNeedToSaveData(nextNode, client);
                    }
                    node.status = PIPELINE_STATUS.SUCCESS;
                    //Save node status with i_params and o_params in DB
                    //Clean out params and i_params
                    node.i_params = [];
                    node.o_params = [];
                    this.iNeedToSaveData(node, client);
                    await client.query('COMMIT');
                } catch (err) {
                    await client.query('ROLLBACK');
                } finally {
                    client.release();
                }
            }).catch(err => {
            });
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
    iNeedToSaveData(node, client) {
        this.pipeConsole.log(`${Date.now()} :: Saving status of node ${node.id}`)
        let db = this.db;
        let saver = async function () {
            if (client) {
                updateNode(client, node).then((data) => {
                }).catch(err => {
                    throw err;
                })
            } else {
                let client = await db.getClient();
                let arr = false;
                try {
                    await client.query('BEGIN');
                    await updateNode(client, node);
                    await client.query('COMMIT');
                } catch (err) {
                    arr = err;
                    await client.query('ROLLBACK');
                } finally {
                    client.release();
                }
                if (arr) {
                    throw new Error(arr)
                }
            }
        };
        saver().then(() => {
        }).catch(err => {
        })

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
        updatePipeline(this.pipe, this.pipe.nodes).then(() => {
            this.killController();
        }).catch(err => {
            this.killController();
        })
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
    removeService(node, name) {
        this.service = this.services.filter((val, i, arr) => {
            if (val.node && val.node.id === node.id) {
                return false;
            }
            return true;
        })
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
        if (found && found.name) {
            return found.objeto;
        }
        return null;
    }
}

/**
 * Finds the last updates of a node in the DB
 * @param {PipelineNode} node 
 */
async function getLastUpdateNode(node) {
    try {
        let getNode = await db.query(`
        SELECT *
        FROM pipeline_nodes
        WHERE id=$1;
    `, [node.id]);
        if (getNode.rowCount < 1)
            throw new Error("Nodes not found for pipeline")
        let auxNode = getNode.rows[0];
        node.status = auxNode.status;
        node.last_update = auxNode.last_update;
        node.start_date = auxNode.start_date;
        node.end_date = auxNode.end_date;
        if (auxNode.data.properties)
            node.properties = auxNode.data.properties
        //Only properties updates, because redraw the map of references is tyring
        /*
    if(auxNode.data.inputConnectors){
        node.setInputConnectors(connectorsFromJSONarray(auxNode.data.inputConnectors,0,node))
    }
    if(auxNode.data.errorConnectors){
        node.setErrorConnectors(connectorsFromJSONarray(auxNode.data.errorConnectors,0,node))
    }
    if(auxNode.data.outputConnectors){
        node.setOutputConnectors(connectorsFromJSONarray(auxNode.data.outputConnectors,0,node))
    }
    node.fillReferences(node.pipe.nodes)*/
    } catch (err) { }
}
/**
 * Update a pipeline and a list of nodes
 * @param {Pipeline} pipe 
 * @param {PipelineNode[]} nodes 
 */
async function updatePipeline(pipe, nodes = []) {
    let client = await db.getClient();
    let error;
    try {
        await client.query('BEGIN');
        let updatePipe = await client.query(`
        UPDATE 
            pipelines
        SET 
            status=$3,
            acquire_date=current_timestamp,
            last_update=current_timestamp,
            start_date=$4,
            end_date=$5
        WHERE
            id=$1
            AND cluster_owner=$2
            AND last_update <= $6
        RETURNING *;
        `, [pipe.id, process.title, pipe.status, pipe.start_date, pipe.end_date, pipe.last_update]);
        let updateResult = obtainResultFromUpdate(updatePipe)
        if (!updateResult)
            throw new Error("No Pipelines Found")
        let promises = [];
        for (let node of nodes) {
            promises.push(updateNode(client, node));
        }
        //Parallelize all the savings
        await Promise.all(promises);
        await client.query('COMMIT');
    } catch (err) {
        try {
            await client.query('ROLLBACK');
        } catch (err) { }
        error = err;
    } finally {
        client.release();
    }
    if (error) {
        throw error;
    }
}
function obtainResultFromUpdate(resDB) {
    if (resDB.length && resDB.length > 0) {
        for (let result of resDB) {
            if (result.command && result.command === 'UPDATE' && result.rows && result.rows.length > 0) {
                return result;
            }
        }
    } else if (resDB.command && resDB.command === 'UPDATE' && resDB.rows.length > 0) {
        return resDB;
    }
    return null;
}
/**
 * Use a PoolClient to update all nodes using a transaction
 * @param {PoolClient} client 
 * @param {PipelineNode} node 
 */
async function updateNode(client, node, ret = 0) {
    if (ret < 3) {
        let updateNodeRes = await client.query(`
            UPDATE 
                pipeline_nodes
            SET 
                last_update=current_timestamp,
                status=$2,
                io_params=$3,
                data=$4
            WHERE
                id=$1
            RETURNING *;
        `, [node.id, node.status,
            { i_params: node.i_params, o_params: node.o_params },
            generateDataToDB(node)
            ]);
        if (updateNodeRes.rowCount === 1)
            return;
        else
            await updateNode(client, node, ret);
    } else {
        throw new Error("Cannot Save Node")
    }
}

/**
 * Generate data object to store all properties of PipelineNode
 * @param {PipelineNode} myNode 
 * @param {} def 
 */
function generateDataToDB(myNode, def) {
    let node = myNode.toJSON();
    let data = {};
    if (node.properties && util.isArray(node.properties)) {
        data.properties = node.properties;
    } else {
        data.properties = util.isArray(def.properties) ? def.properties : [];
    }
    if (node.inputConnectors && util.isArray(node.inputConnectors)) {
        data.inputConnectors = node.inputConnectors;
    } else {
        data.inputConnectors = def.inputConnectors ? def.inputConnectors : [];
    }
    if (node.outputConnectors && util.isArray(node.outputConnectors)) {
        data.outputConnectors = node.outputConnectors;
    } else {
        data.outputConnectors = util.isArray(def.outputConnectors) ? def.outputConnectors : [];
    }
    if (node.errorConnectors && util.isArray(node.errorConnectors)) {
        data.errorConnectors = node.errorConnectors;
    } else {
        data.errorConnectors = util.isArray(def.errorConnectors) ? def.errorConnectors : [];
    }
    if (node.inputParams && util.isArray(node.inputParams)) {
        data.inputParams = node.inputParams;
    } else {
        data.inputParams = util.isArray(def.inputParams) ? def.inputParams : [];
    }
    if (node.outputParams && util.isArray(node.outputParams)) {
        data.outputParams = node.outputParams;
    } else {
        data.outputParams = util.isArray(def.outputParams) ? def.outputParams : [];
    }
    if (node.errorParams && util.isArray(node.errorParams)) {
        data.errorParams = node.errorParams;
    } else {
        data.errorParams = util.isArray(def.errorParams) ? def.errorParams : [];
    }
    return data;
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