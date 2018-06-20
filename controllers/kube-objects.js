const db = require('../db/index')
/*
 * We dont need subcontrollers for the roles because only the admin can use infraestructure
*/
exports.createKubeObject = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3) {
        try {
            let name = "";
            if (req.body.name && typeof req.body.name == 'string')
                name = req.body.name;
            else
                throw new Error("Not a valid name")
            let description = "";
            if (req.body.description && typeof req.body.description === 'string')
                description = req.body.description;
            let content;
            if (req.body.content)
                content = req.body.content;
            else
                throw new Error("Problem with plugin content");
            let dbRes = await db.query(`
            INSERT INTO kube_objects
            (name,description,content) 
            VALUES 
                ($1,$2,$3)
            `, [name, description, content]);
            if (dbRes.rowCount > 0 || (dbRes.rows && dbRes.rows.length > 0)){
                status = 200;
                data = dbRes.rows;
            }
        } catch (err) {}
    }
    res.status(status).send(data);
}

exports.deleteKubeObject = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined && req.params.name && typeof req.params.name === 'string') {
        try {
            let resDB = await db.query(`
            DELETE FROM kube_objects 
            WHERE 
                id=$1
            `, [req.params.name]);
            if (resDB.rowCount >= 1) {
                status = 200;
                data = {};
            }
            else {
                throw new Error("Data not found")
            }
        } catch (err) { }
    }
    res.status(status).send(data);
}
exports.updateKubeObject = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined && req.params.name && typeof req.params.name === 'string') {
        try {
            let name = "";
            if (req.body.name && typeof req.body.name == 'string')
                name = req.body.name;
            else
                throw new Error("Not a valid name")
            let description = "";
            if (req.body.description && typeof req.body.description === 'string')
                description = req.body.description;
            let content;
            if (req.body.content)
                content = req.body.content;
            else
                throw new Error("Problem with plugin content");
            let dbRes = await db.query('SELECT * FROM kube_objects WHERE id=$1', [req.params.name]);
            if (dbRes.rows.length < 1) {
                throw new Error("Data not found")
            }
            let resDB = await db.query(`
            UPDATE kube_objects 
                SET 
                    name=$2,description=$3,content=$4
                WHERE 
                    id=$1
            `, [req.params.name,name,description,content]);
            if (resDB.rowCount >= 1) {
                status = 200;
                data = {};
            }
            else {
                throw new Error("Data not found")
            }
        } catch (err) { }
    }
    res.status(status).send(data);
}

exports.findKubeObject = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role >= 0 && req.params && 'name' in req.params) {
        try {
            let dbRes = await db.query('SELECT * FROM kube_objects WHERE id=$1', [req.params.name]);
            if (dbRes.rows.length > 0) {
                status = 200;
                data = dbRes.rows[0];
            }
        } catch (err) { }
    }
    res.status(status).send(data);
}
exports.findKubeObjects = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not valid' }
    if (req.user && req.user.role >= 0) {
        try {
            let dbRes = await db.query('SELECT * FROM kube_objects ORDER BY name;', []);
            if (dbRes.rows.length > 0) {
                status = 200;
                data = dbRes.rows;
            }
        } catch (err) { }
    }
    res.status(status).send(data);
}