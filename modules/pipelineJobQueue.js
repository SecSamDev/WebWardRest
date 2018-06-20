const { PIPELINE_STATUS } = require('./pipeline_status')
const db = require('../db/index');
const fs = require('fs')
const { Console } = require('console')
const { findModuleInLibrary } = require('./module_library');
const { loadModulesFromURL } = require('./loader');
const timeout = process.env.WW_TIMER ? process.env.WW_TIMER : 5000;
const { WebWardModule } = require('./ww_module');
const util = require('util')
const { PipelineNode, NodeParameter, NodeConnector, Pipeline, pipelineNodeFromJSON } = require('./pipeline')

const { PipeLifecycleController } = require('./PipeLifecycleController')
//Console for Debug purpouses
var pipeConsole;

const acquirerPipelineSecs = 30;
const retries = 0;
const maxRetries = 5;

var timer;
var timerPipeline;
/**
 * List of controllers to avoid duplicate controllers for the same pipeline
 * @type {PipeLifecycleController[]}
 */
var controllers = [];
/** 
 * Starts the Job Queue System
*/
function start() {
    if (timer)//clear previous timer
        clearInterval(timer);
    else {
        const output = fs.createWriteStream('./' + process.title + '-module-stdout.log');
        const errorOutput = fs.createWriteStream('./' + process.title + '-module-stderr.log');
        pipeConsole = new Console(output, errorOutput);
    }
    //---------------------ONLY FOR AQCUIRING PIPELINES----------------------------
    timer = generateTimerAquire(3000);
}
/**
 * Sets a timer
 * @param {number} interval 
 */
function generateTimerAquire(interval) {
    return setInterval(() => {
        pipelineAcquirer().then(() => {
            //If sucessfully obtain a pipeline then the next aqcuire delta time is increased
            //This is for letting other nodes take pipelines
            interval *= 2;
            if (interval > acquirerPipelineSecs * 1000) {
                //Limit the interval to a maximum
                interval = acquirerPipelineSecs * 1000;
            } else {
                if (timer) {
                    clearInterval(timer);
                    timer = generateTimerAquire(interval);
                }
            }
        }).catch(err => {
        })
    }, interval)
}
/** 
 * Stops the Job Queue System
*/
function stop() {
    clearInterval(timer);
}

/** 
 * A function that looks for pipes that are not owned by anyone in the last 30 seconds.
*/
async function pipelineAcquirer() {
    try {
        let resDB = await db.query(`
        SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
        WITH pipes AS (
            SELECT *
            FROM   pipelines
            WHERE  
                acquire_date < current_timestamp - interval '${acquirerPipelineSecs} seconds'
                AND status <> 5
            LIMIT  1
        )
        UPDATE 
            pipelines
        SET 
            acquire_date=current_timestamp,
            cluster_owner='${process.title}'
        FROM pipes
        RETURNING *;
    `, []);
        let updateResult = obtainResultFromUpdate(resDB)
        if (!updateResult)
            return;
        let pipe = updateResult.rows[0];
        let pipeline = new Pipeline(
            pipe.id, pipe.status, pipe.last_update,
            pipe.acquire_date, pipe.owner, pipe.web_project,
            pipe.start_date, pipe.end_date
        )
        //Remove previous controller
        controllers.filter((val,i,arr)=>{
            if (val.pipe.id === pipeline.id){
                val.killController();
                return false;
            }else{
                return true;
            }
        });
        let getNodes = await db.query(`
            SELECT *
            FROM pipeline_nodes
            WHERE pipe=$1;
        `, [pipe.id]);
        pipeline.nodes = getNodes.rows.map((val, i, arr) => {
            return pipelineNodeFromJSON(mapDataDBToNode(val));
        });
        //Fill with modules
        for (let i = 0; i < pipeline.nodes.length; i++) {
            try {
                pipeline.nodes[i].mod = findModuleInLibrary(pipeline.nodes[i].tag);
                if (!pipeline.nodes[i].mod) {
                    //Not found, try to reinstall modules from DB
                    let modDB = await db.query(`
                        SELECT *
                        FROM ww_modules
                        WHERE name=$1
                    `, [pipeline.nodes[i].tag]);
                    if (modDB.rowCount > 0) {
                        //Load module from URL
                        await loadModulesFromURL(modDB.rows[0].origin);
                        pipeline.nodes[i].mod = findModuleInLibrary(pipeline.nodes[i].tag);
                        //If still is not loaded... then remove this module
                        if (!pipeline.nodes[i].mod)
                            throw new Error("")
                    }
                }
                pipeline.nodes[i].pipe = pipeline;
                pipeline.nodes[i].fillReferences(pipeline.nodes);
            } catch (err) {
                console.error(err)
            }
        }

        let controller = new PipeLifecycleController(pipeline, db, 2, pipeConsole);
        controllers.push(controller)
        pipeConsole.log(`${Date.now()} :: ${pipeline.id} :: NEW CONTROLLER`)
    } catch (err) {
        pipeConsole.error(`${Date.now()} :: ${pipeline.id} :: ${err.message}`)
    }

}


/**
 * Finds a Pipeline in the DB and if is modified then return the value
 * @param {Pipeline} pipe 
 */
async function getLastUpdateOfPipeline(pipe) {
    //Get the last update of the pipeline.
    let resDB = await db.query(`
        UPDATE 
            pipelines
        SET 
            acquire_date=current_timestamp
        WHERE
            id=$1
            AND cluster_owner=$2
        RETURNING *;
    `, [pipe.id, process.title]);
    if (resDB.rowCount < 1)
        return;//No updates
    let pipeline = resDB[0];
    let getNodes = await db.query(`
        SELECT *
        FROM pipeline_nodes
        WHERE pipe=$1;
    `, [pipe.id]);
    let data = getNodes.rows.map((val, i, arr) => {
        return pipelineNodeFromJSON(mapDataDBToNode(val));
    });
    if (getNodes.rowCount < 1)
        throw new Error("Nodes not found for pipeline")
    pipe.nodes = getNodes.data;
    if (pipeline.status)
        pipe.status = pipeline.status;
    pipe.last_update = pipeline.last_update;
    pipe.acquire_date = pipeline.acquire_date;
    //Fill with modules
    for (let i = 0; i < pipeline.nodes.length; i++) {
        try {
            pipeline.nodes[i].mod = findModuleInLibrary(pipeline.nodes[i].tag);
            if (!pipeline.nodes[i].mod) {
                //Not found, try to reinstall modules from DB
                let modDB = await db.query(`
                    SELECT *
                    FROM ww_modules
                    WHERE name=$1
                `, [pipeline.nodes[i].tag]);
                if (modDB.rowCount > 0) {
                    //Load module from URL
                    await loadModulesFromURL(modDB.rows[0].origin);
                    pipeline.nodes[i].mod = findModuleInLibrary(pipeline.nodes[i].tag);
                    //If still is not loaded... then remove this module
                    if (!pipeline.nodes[i].mod)
                        throw new Error("")
                }
            }
            pipeline.nodes[i].pipe = pipe;
            pipeline.nodes[i].fillReferences(pipeline.nodes);
        } catch (err) { }
    }
}

/**
 * Saves the pipeline in the DB with all of her nodes
 * @param {Pipeline} pipe 
 */
async function savePipelineWithNodes(pipe) {
    let client = await db.getClient();
    try {
        await client.query('BEGIN');
        let updatePipe = await client.query(`
        UPDATE 
            pipelines
        SET 
            last_update=current_timestamp,
            status=$2,
            start_date=$3,
            end_date=$4,
            acquire_date=$5
        WHERE
            id=$1
        RETURNING *;
        `, [pipe.id, pipe.status, pipe.start_date, pipe.end_date, pipe.acquire_date]);
        if (updatePipe.rowCount !== 1)
            throw new Error("Not saved")
        let promises = [];
        for (let i = 0; i < pipe.nodes.length; i++) {
            promises.push(updateNode(client, pipe.nodes[i]));
        }
        //Parallelize all the savings
        await Promise.all(promises);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }
}
/**
 * Clean all the parameters i_params and o_params from all the Nodes except START nodes.
 * @param {Pipeline} pipe 
 * @param {PipelineNode} node Node that 
 */
async function cleanPipeline(pipe, node) {
    let client = await db.getClient();
    try {
        await client.query('BEGIN');
        let updatePipe = await client.query(`
        UPDATE 
            pipelines
        SET 
            last_update=current_timestamp,
            status=1,
            start_date=current_timestamp,
            acquire_date=current_timestamp
        WHERE
            id=$1
        RETURNING *;
        `, [pipe.id]);
        if (updatePipe.rowCount !== 1)
            throw new Error("Not saved")
        let promises = [];
        for (let i = 0; i < pipe.nodes.length; i++) {
            if (!pipe.noCleanNodes.find((val, i, arr) => {
                if (val.id === pipe.node.id)
                    return true;
                return false;
            })) {
                pipe.nodes[i].status = 0;
                pipe.nodes[i].i_params = [];
                pipe.nodes[i].o_params = [];
                promises.push(updateNode(client, pipe.nodes[i]));
            }
        }
        //Parallelize all the savings
        await Promise.all(promises);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }
}


/**
 * 
 * @param {PipelineNode[]} array 
 */
function getStartNodes(array) {
    return array.filter((val, i, arr) => {
        if (val.type === 'START') {
            return true;
        }
        return false;
    });
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
        pipeConsole.error(err)
    }
    return pipe;
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


exports.start = start;
exports.stop = stop;