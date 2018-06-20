const db = require('../../db/index')
/**
 * Find all nodes for a certain pipline. 
 * Route: /api/pipeline/:name/node
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findPipe = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
        let resDB = await db.query(`
        SELECT 
            id,
            web_project,
            owner,
            name,
            description,
            status,
            create_date,
            last_update
        FROM pipelines
        WHERE
            id=$1
    `, [req.params.name]);
        if (resDB.rows.length >= 1) {
            status = 200;
            data = resDB.rows[0];
        }
        else
            throw new Error("Data not found")
    } catch (err) {}
    res.status(status).send(data);
}
/**
 * Find all nodes for a certain pipline. 
 * Route: /api/pipeline/:name/node
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findPipes = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
        let resDB;
        if (req.query.web_project && typeof req.query.web_project == 'string') {
            resDB = await db.query(`
            SELECT 
                id,
                web_project,
                owner,
                name,
                description,
                status,
                create_date,
                last_update
            FROM pipelines
            WHERE
                web_project=$1
        `, [req.query.web_project]);
        } else {
            resDB = await db.query(`
            SELECT 
                id,
                web_project,
                owner,
                name,
                description,
                status,
                create_date,
                last_update
            FROM pipelines
        `, []);
        }
        if (resDB.rows.length >= 1) {
            status = 200;
            data = resDB.rows;
        }
        else
            throw new Error("Data not found")
    } catch (err) {}
    res.status(status).send(data);
}
/**
 * Creates a new node for a certain pipeline
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createPipeline = async (req, res, next) => {
    //Default response= Data not valid
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.body !== null && req.body !== undefined) {
        try {
            //Now that exists then parse data
            let name = "";
            if (req.body.name && typeof req.body.name == 'string')
                name = req.body.name;
            else
                throw new Error("Not a valid NAME")
            let web_project = "";
            if (req.body.web_project && typeof req.body.web_project == 'string')
                web_project = req.body.web_project;
            else
                throw new Error("Not a valid WEB PROJECT")
            let description = "";
            if (req.body.description && typeof req.body.description == 'string')
                description = req.body.description;

            let dbresult = await db.query(`
                INSERT INTO pipelines 
                    (name,owner,web_project,description,cluster_owner) 
                VALUES 
                    ($1,$2,$3,$4,$5)
                RETURNING *;
            `, [name, req.user.id, web_project, description, '']);
            status = 200;
            data = {};
            if (dbresult.rowCount === 1) {
                data = dbresult.rows[0];
            }
        } catch (err) {}
    }
    res.status(status).send(data);
}
exports.deletePipeline = async (req, res, next) => {
    //Default response= Data not valid
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined) {
        if (req.params.name && typeof req.params.name === 'string') {
            try {
                let resDB = await db.query(`
                DELETE FROM pipelines 
                WHERE 
                    id=$1 AND owner=$2
                `, [req.params.name, req.user.id]);
                if (resDB.rowCount >= 1) {
                    status = 200;
                    data = {};
                }
                else {
                    throw new Error("Data not found")
                }
            } catch (err) {}
        }
    }
    res.status(status).send(data);
}
exports.updatePipeline = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.body !== null && req.body !== undefined && req.body.id && typeof req.body.id === 'string' && req.body.id === req.params.name) {
        try {
            let dbresult = await db.query(`
                SELECT 
                    id,
                    name,
                    description,
                    status
                FROM pipelines
                WHERE 
                    id=$1
            `, [req.body.id]);
            if (dbresult.rowCount < 1)
                throw new Error("Dta not found")
            let name = (req.body.name && typeof req.body.name == 'string') ? req.body.name : dbresult.rows[0].name;
            let description = (req.body.description && typeof req.body.description == 'string') ? req.body.description : dbresult.rows[0].description;
            let sts = (req.body.status) ? req.body.status : dbresult.rows[0].status;
            let dbRes = await db.query(`
                UPDATE pipelines 
                SET 
                    name=$2,
                    description=$3,
                    last_update=current_timestamp,
                    status=$4
                WHERE 
                    id=$1
                RETURNING *;
            `, [req.body.id, name, description,sts]);
            let resDB = obtainResultFromUpdate(dbRes)
            if (resDB && resDB.rowCount >= 1) {
                status = 200;
                data = resDB.rows[0];
            }
        } catch (err) {}
    }
    res.status(status).send(data);
}
function obtainResultFromUpdate(resDB) {
    if (resDB.length && resDB.length > 0) {
        for (let result of resDB) {
            if (result.command && result.command === 'UPDATE' && result.rows && result.rows.length > 0) {
                return result;
            }
        }
    }else if(resDB.command && resDB.command === 'UPDATE' && resDB.rows.length > 0){
        return resDB;
    }
    return null;
}