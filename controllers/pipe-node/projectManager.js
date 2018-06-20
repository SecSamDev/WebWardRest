const db = require('../../db/index')
const util = require('util')
/**
 * Find all nodes for a certain pipline. 
 * Route: /api/pipeline/:name/node
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findNodes = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined && req.params.name && typeof req.params.name === 'string') {
        try {
            let resDB = await db.query(`
                SELECT *
                FROM pipeline_nodes
                WHERE 
                    pipe=$1
                    AND owner=$2
            `, [req.params.name,req.user.id]);
            if (resDB.rows.length >= 1) {
                status = 200;
                data = [];
                data = resDB.rows.map((val, i, arr) => {
                    return mapDataDBToNode(val);
                });
            }
            else
                throw new Error("Data not found")
        } catch (err) { }
    }
    res.status(status).send(data);
}
exports.findAllNodes = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
        let resDB = await db.query(`
            SELECT pipeline_nodes.id,pipeline_nodes.name
            FROM pipeline_nodes
            INNER JOIN
                pipelines
                    ON pipeline_nodes.pipe=pipelines.id
            WHERE 
                pipelines.owner=$1
        `, [req.user.id]);
        if (resDB.rows.length < 1)
            throw new Error("Data not found")
        status = 200;
        data = resDB.rows;
    } catch (err) { }
    res.status(status).send(data);
}
/**
 * Creates a new node for a certain pipeline
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createNode = async (req, res, next) => {
    //Default response= Data not valid
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.body !== null && req.body !== undefined) {
        try {
            //First check if the pipeline exists
            let pipeDB = await getStatusOfPipeline(req.params.name);
            if (!pipeDB || pipeDB.status !== 5) {
                throw new Error('Only allowed changes on inactived pipelines')
            }
            if(!pipeDB || pipeDB.owner != req.user.id){
                throw new Error('You are not the owner')
            }
            //Now that exists then parse data
            let name = "";
            if (req.body.name && typeof req.body.name == 'string')
                name = req.body.name;
            else
                throw new Error("Not a valid NAME")
            let tag = "";
            if (req.body.tag && typeof req.body.tag == 'string')
                tag = req.body.tag;
            else
                throw new Error("Not a valid TAG")
            //Add node with a status, to allow alredy started nodes
            let sts = 0;
            if (req.body.status && util.isNumber(req.body.status))
                sts = Number(req.body.status);
            let type = (req.body.type && typeof req.body.type === 'string') ? req.body.type : "ANY";
            let data2 = returnDataFromReq(req, pipeDB.rowCount > 0 ? pipeDB.rows[0] : {});
            let dbresult = await db.query(`
                INSERT INTO pipeline_nodes 
                    (name,tag,type,pipe,data,status) 
                VALUES 
                    ($1,$2,$3,$4,$5,$6)
                RETURNING *;
            `, [name, tag, type, pipeDB.id, data2,sts]);
            if (dbresult.rowCount > 0) {
                status = 200;
                data = dbresult.rows[0];
            }
        } catch (err) {
            status = 500;
            data.message = err.message;
        }
    }
    res.status(status).send(data);
}
exports.deleteNode = async (req, res, next) => {
    //Default response= Data not valid
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined) {
        if (req.params.name && typeof req.params.name === 'string' && req.params.pipename && typeof req.params.pipename === 'string') {
            try {
                let pipe = await getStatusOfPipeline(req.params.pipename);
                if (pipe.status) {
                    if (pipe.status !== 5)
                        throw new Error('Only allowed changes on inactived pipelines')
                } else {
                    throw new Error('Pipline Not found')
                }
                if(pipe.owner != req.user.id){
                    throw new Error('You are not the owner')
                }
                let resDB = await db.query(`
                DELETE FROM pipeline_nodes 
                WHERE 
                    id=$1 AND pipe=$2
                `, [req.params.name, req.params.pipename]);
                if (resDB.rowCount >= 1) {
                    status = 200;
                    data = {};
                }
            } catch (err) {
                status = 500;
                data = { message: err.message };
            }
        }
    }
    res.status(status).send(data);
}

async function getStatusOfPipeline(id) {
    let resDB = await db.query(`
        SELECT * FROM pipelines
        WHERE 
            id=$1
        LIMIT 1 
        `, [id]);
    if (resDB.rowCount >= 1) {
        return resDB.rows[0];
    }
}

exports.updateNode = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.body !== null && req.body !== undefined
        && req.body.id && typeof req.body.id === 'string'
        && req.params.name && req.params.pipename
        && req.body.id === req.params.name) {
        let client = await db.getClient();
        try {
            let queryParams = "";
            let queryArray = [req.body.id, req.params.pipename];
            let nParams = 2;
            if (req.body.name && typeof req.body.name == 'string') {
                queryArray.push(req.body.name);
                queryParams += (nParams > 2 ? ", " : "") + "name=$" + ++nParams;
            }
            if (req.body.tag && typeof req.body.tag == 'string') {
                queryArray.push(req.body.tag);
                queryParams += (nParams > 2 ? ", " : "") + "tag=$" + ++nParams;
            }
            if (req.body.type && typeof req.body.type == 'string') {
                queryArray.push(req.body.type);
                queryParams += (nParams > 2 ? ", " : "") + "type=$" + ++nParams;
            }
            if (req.body.x && typeof req.body.x == 'number') {
                queryArray.push(req.body.x);
                queryParams += (nParams > 2 ? ", " : "") + "x=$" + ++nParams;
            }
            if (req.body.y && typeof req.body.y == 'number') {
                queryArray.push(req.body.y);
                queryParams += (nParams > 2 ? ", " : "") + "y=$" + ++nParams;
            }
            if (req.body.width && typeof req.body.width == 'number') {
                queryArray.push(req.body.width);
                queryParams += (nParams > 2 ? ", " : "") + "width=$" + ++nParams;
            }
            if (req.body.height && typeof req.body.height == 'number') {
                queryArray.push(req.body.height);
                queryParams += (nParams > 2 ? ", " : "") + "height=$" + ++nParams;
            }
            if (req.body.status && util.isNumber(req.body.status)) {
                queryArray.push(Number(req.body.status));
                queryParams += (nParams > 2 ? ", " : "") + "status=$" + ++nParams;
            }
            let pipe = await getStatusOfPipeline(req.params.pipename);
            if(!pipe || pipe.owner != req.user.id){
                throw new Error('You are not the owner')
            }
            if (req.body.inputConnectors || req.body.outputConnectors || req.body.errorConnectors || req.body.properties || req.body.inputParams || req.body.errorParams || req.body.outputParams) {
                queryArray.push(returnDataFromReq(req, {}));
                queryParams += (nParams > 2 ? ", " : "") + "data=$" + ++nParams;
            }
            if (queryArray.length === 2) {
                throw new Error("Data not valid")
            }
            await client.query('BEGIN');
            let dbRes = await client.query(`
                UPDATE pipeline_nodes 
                SET ${queryParams}
                WHERE 
                    id=$1
                    AND pipe=$2
                RETURNING *
            `, queryArray);
            let updatePipe = await client.query(`
                UPDATE pipelines
                SET last_update=current_timestamp
                WHERE 
                    id=$1
            `, [req.params.pipename]);
            await client.query('COMMIT');
            if (dbRes.rowCount > 0) {
                status = 200;
                data = {};
            }

        } catch (err) {
            await client.query('ROLLBACK')
            status = 500;
            data.message = err.message;
        } finally {
            client.release()
        }
    }
    res.status(status).jsonp(data);
}

function returnDataFromReq(req, def) {
    let data = {};
    if (req.body.properties && util.isArray(req.body.properties)) {
        data.properties = req.body.properties;
    } else {
        data.properties = util.isArray(def.properties) ? def.properties : [];
    }
    if (req.body.inputConnectors && util.isArray(req.body.inputConnectors)) {
        data.inputConnectors = req.body.inputConnectors;
    } else {
        data.inputConnectors = def.inputConnectors ? def.inputConnectors : [];
    }
    if (req.body.outputConnectors && util.isArray(req.body.outputConnectors)) {
        data.outputConnectors = req.body.outputConnectors;
    } else {
        data.outputConnectors = util.isArray(def.outputConnectors) ? def.outputConnectors : [];
    }
    if (req.body.errorConnectors && util.isArray(req.body.errorConnectors)) {
        data.errorConnectors = req.body.errorConnectors;
    } else {
        data.errorConnectors = util.isArray(def.errorConnectors) ? def.errorConnectors : [];
    }
    if (req.body.inputParams && util.isArray(req.body.inputParams)) {
        data.inputParams = req.body.inputParams;
    } else {
        data.inputParams = util.isArray(def.inputParams) ? def.inputParams : [];
    }
    if (req.body.outputParams && util.isArray(req.body.outputParams)) {
        data.outputParams = req.body.outputParams;
    } else {
        data.outputParams = util.isArray(def.outputParams) ? def.outputParams : [];
    }
    if (req.body.errorParams && util.isArray(req.body.errorParams)) {
        data.errorParams = req.body.errorParams;
    } else {
        data.errorParams = util.isArray(def.errorParams) ? def.errorParams : [];
    }
    return data;
}

function mapDataDBToNode(data) {
    let ret = {};
    ret.id = data.id;
    ret.id = data.id;
    ret.name = data.name;
    ret.type = data.type;
    ret.tag = data.tag;
    ret.y = data.y;
    ret.x = data.x;
    ret.width = data.width;
    ret.height = data.height;
    ret.pipe = data.pipe;
    ret.status = data.status;
    ret.properties = data.data.properties || [];
    ret.inputParams = data.data.inputParams || [];
    ret.outputParams = data.data.outputParams || [];
    ret.errorParams = data.data.errorParams || [];
    ret.inputConnectors = data.data.inputConnectors || [];
    ret.outputConnectors = data.data.outputConnectors || [];
    ret.errorConnectors = data.data.errorConnectors || [];
    return ret;
}