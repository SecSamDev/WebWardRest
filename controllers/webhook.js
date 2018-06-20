const db = require('../db/index')
const util = require('util')

exports.createWebHook = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
        if (!(req.body.node && typeof req.body.node === 'string'))
            throw new Error("Not valid pipeline node")
        if (!(req.body.name && typeof req.body.name === 'string'))
            throw new Error("Not valid webhook name")
        let resDB = await db.query(`
        SELECT 
            pipeline_nodes.id
        FROM 
            pipeline_nodes
        INNER JOIN 
            pipelines 
                ON pipeline_nodes.pipe=pipelines.id
        WHERE
            pipeline_nodes.id=$1
            AND pipelines.owner=$2
        LIMIT 1;
        `, [req.body.node, req.user.id]);
        if (!(resDB.rows.length === 1))
            throw new Error("No valid Node")
        let insertInDB = await db.query(`
            INSERT INTO web_hooks 
                (name,node) 
                VALUES 
                ($1,$2)
        `, [req.body.name, req.body.node]);
        if (!(resDB.rows.length === 1))
            throw new Error("Cant save")
        status = 200;
        data = {};
    } catch (err) {
        data = 500;
        data.message = err.message;
    }
    res.status(status).jsonp(data);
    next()
}
exports.deleteWebHook = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
        if (!(req.params.name && typeof req.params.name === 'string'))
            throw new Error("Not valid webhook")
        let resDB = await db.query(`
        SELECT 
            pipeline_nodes.id
        FROM 
            pipeline_nodes
        INNER JOIN 
            pipelines 
                ON pipeline_nodes.pipe=pipelines.id
        INNER JOIN 
            web_hooks 
                ON pipeline_nodes.id=web_hooks.node
        WHERE
            web_hooks.id=$1
            AND pipelines.owner=$2
        LIMIT 1;
        `, [req.params.name, req.user.id]);
        if (!(resDB.rows.length === 1))
            throw new Error("No valid WebHook")
        let insertInDB = await db.query(`
            DELETE FROM web_hooks 
            WHERE 
                id=$1
        `, [req.body.name]);
        if (!(resDB.rows.length === 1))
            throw new Error("Cant delete")
        status = 200;
        data = {};
    } catch (err) {
        data = 500;
        data.message = err.message;
    }
    res.status(status).jsonp(data);
    next()
}
exports.findWebHooks = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
        let query = "pipelines.owner=$1";
        let queryArray = [req.user.id]
        if (req.query.web_project && typeof req.query.web_project === 'string') {
            query = "pipelines.web_project=$1";
            queryArray = [req.query.web_project]
        }
        let resDB = await db.query(`
        SELECT 
            web_hooks.*, pipeline_nodes.name AS nodename
        FROM 
            pipeline_nodes
        INNER JOIN 
            pipelines 
                ON pipeline_nodes.pipe=pipelines.id
        INNER JOIN 
            web_hooks 
                ON pipeline_nodes.id=web_hooks.node
        WHERE
            ${query}
        `, queryArray);
        if ((resDB.rows.length < 1))
            throw new Error("Webhooks not found")
        status = 200;
        data = resDB.rows;
    } catch (err) {
        data = 500;
        data.message = err.message;
    }
    res.status(status).jsonp(data);
    next()
}
exports.findWebHookForNode = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
        if (!(req.params.name && typeof req.params.name === 'string'))
            throw new Error("Not valid node")
        let resDB = await db.query(`
        SELECT 
            web_hooks.*
        FROM 
            pipeline_nodes
        INNER JOIN 
            pipelines 
                ON pipeline_nodes.pipe=pipelines.id
        INNER JOIN 
            web_hooks 
                ON pipeline_nodes.id=web_hooks.node
        WHERE
            pipeline_nodes.id=$1
            AND pipelines.owner=$2
        `, [req.params.name, req.user.id]);
        if ((resDB.rows.length !== 1))
            throw new Error("Webhooks not found")
        status = 200;
        data = resDB.rows[0];
    } catch (err) {
        data = 500;
        data.message = err.message;
    }
    res.status(status).jsonp(data);
    next()
}
exports.updateHook = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
        let resDB = await db.query(`
        UPDATE web_hooks 
        SET name=$2
        FROM
            web_hooks AS wh
            INNER JOIN 
                (
                    SELECT pps.owner AS pps_owner,pps.id AS pps_id,pn.id AS pn_id
                    FROM pipelines AS pps
                    INNER JOIN pipeline_nodes AS pn
                        ON pn.pipe=pps.id
                    WHERE pps.owner=$3
                ) AS pp
                ON wh.node=pp.pn_id
        WHERE 
        wh.id=$1
        `, [req.params.name, req.body.name, req.user.id]);
        if ((resDB.rowCount  < 1))
            throw new Error("Webhooks not found")
        status = 200;
        data = {};
    } catch (err) {
        console.log(err)
        data = 500;
        data.message = err.message;
    }
    res.status(status).jsonp(data);
    next()
}

exports.activateGET = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
        if (!(req.params.name && typeof req.params.name === 'string'))
            throw new Error("Not valid webhook")
        //Activate PipelineNode using WebHook
        await activateNodeByWebHook(req.params.name)
        status = 200;
        data = {};
    } catch (err) {
        console.log(err)
        data = 500;
        data.message = err.message;
    }
    res.status(status).jsonp(data);
    next()
}
/**
 * Set a Pipeline Node as Active in the DB
 * @param {string} whID 
 */
async function activateNodeByWebHook(whID) {
    let dbClient = await db.getClient();
    let removeWH = false;
    try {
        await dbClient.query('BEGIN');
        let webHooks = await dbClient.query(`
            SELECT *
            FROM   web_hooks
            WHERE  web_hooks.id=$1
            LIMIT  1
        `, [whID]);
        if (webHooks.rowCount !== 1)
            throw new Error("WebHook Not Found")
        let wh = webHooks.rows[0];
        let updatePipNodes = await dbClient.query(`
            UPDATE pipeline_nodes
            SET 
                last_update=current_timestamp,
                status = 1
            WHERE id=$1
            RETURNING *;
        `, [wh.node]);
        if (updatePipNodes.rowCount !== 1) {
            //Node not exists so remove webhook
            removeWH = true;
        } else {
            let node = updatePipNodes.rows[0];
            //Pipeline must not be inactive
            let dbRes = await dbClient.query(`
            UPDATE pipelines
                SET status = 1,
                last_update=current_timestamp
            WHERE 
                pipelines.id=$1
                AND
                    pipelines.status <> 5
        `, [node.pipe]);
            await dbClient.query('COMMIT');
            console.log(`WebHook Activated: ${whID} on ${new Date(Date.now())}`)
        }
    } catch (err) {
        await dbClient.query('ROLLBACK');
        throw err;
    } finally {
        dbClient.release();
    }
    if(removeWH){
        try{
            console.log("Deleting webhook: " + whID)
            let whRemove = await db.query(`
            DELETE FROM  
                web_hooks
            WHERE  
                id=$1;
        `, [whID]);
        console.log("WebHook removed: " + whID)
        }catch(err){
            console.log(err)
        }
    }
}