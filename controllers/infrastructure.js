const db = require('../db/index')
const {
    searchObjects, searchObject, updateObject, exchangeObject, deleteObject, createObject
} = require('../kube/deployer')
/*
 * Allow us to deploy objects. Independiently of the deployment platform
*/
exports.createInfrastructure = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3 && req.body.content) {
        if (req.query.active) {
            try {
                let resKube = await createObject(req.body.content);
                status = 200;
                data = resKube;
            } catch (err) {
                data.error = err.message ? err.message : "Error: " + err.toString();
            }
        } else {
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
                    throw new Error("Problem with content");
                let dbRes = await db.query(`
                    INSERT INTO infrastructure
                    (name,description,content) 
                    VALUES 
                        ($1,$2,$3)
                `, [name, description, content]);
                if (dbRes.rowCount > 0 || (dbRes.rows && dbRes.rows.length > 0)) {
                    status = 200;
                    data = dbRes.rows;
                }
            } catch (err) {
                data.error = err.message ? err.message : "Error: " + err.toString();
            }
        }
    }
    res.status(status).send(data);
}

exports.deleteInfrastructure = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3 && req.params.name && typeof req.params.name === 'string') {
        if (req.query.active) {
            if (!req.query.kind)
                throw new Error("No valid kind")
            try {
                await deleteObject({
                    kind: req.query.kind,
                    metadata: {
                        name: req.params.name
                    }
                });
                status = 200;
                data = {};
            } catch (err) {
                data.error = err.message ? err.message : "Error: " + err.toString();
            }
        } else {
            let dbRes = await db.query(`
            DELETE FROM infrastructure
            WHERE id=$1
            `, [req.params.name]);
            if (dbRes.rowCount > 0 || (dbRes.rows && dbRes.rows.length > 0)) {
                status = 200;
                data = dbRes.rows;
            }
        }

    }
    res.status(status).send(data);
}
exports.updateInfrastructure = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3 && req.body.content && req.params.name) {
        if (req.query.active) {
            try {
                let kubeResp = await updateObject(req.body.content);
                status = 200;
                data = kubeResp;
            } catch (err) {
                data.error = err.message ? err.message : "Error: " + err.toString();
            }
        } else {
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
                    throw new Error("Problem with content");
                let dbRes = await db.query(`
                UPDATE infrastructure 
                SET 
                    name=$2,description=$3,content=$4
                WHERE 
                    id=$1
            `, [req.params.name, name, description, content]);
                if (dbRes.rowCount > 0 || (dbRes.rows && dbRes.rows.length > 0)) {
                    status = 200;
                    data = dbRes.rows;
                }
            } catch (err) {
                data.error = err.message ? err.message : "Error: " + err.toString();
            }
        }
    }
    res.status(status).send(data);
}

exports.findInfrastructure = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3 && req.params.name) {
        if (req.params.active === 'activate' && req.query.kind) {
            try {
                await searchObjects(req.query.kind);
            } catch (err) {
                data.error = err.message ? err.message : "Error: " + err.toString();
            }
        } else {
            try {
                let dbRes = await db.query(`
                SELECT * FROM infrastructure
                WHERE 
                    id=$1
                `, [req.params.name]);
                if (dbRes.rowCount > 0) {
                    status = 200;
                    data = dbRes.rows[0]
                }
            } catch (err) {
                data.error = err.message ? err.message : "Error: " + err.toString();
            }
        }
    }
    res.status(status).send(data);
}
exports.findInfrastructures = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3) {
        if (req.query.active !== undefined && req.query.active) {
            //If is active => execute in the infraestructure deployment
            try {
                status = 200;
                let retArr = [];
                //Search all the active kubernetes objects
                try {
                    let depArr = await searchObjects('Deployment');
                    if (depArr.length && depArr.length > 0)
                        retArr = retArr.concat((depArr).map((val, i, arr) => {
                            return {
                                "name": val.metadata.name ? val.metadata.name : "Deployment " + i,
                                "description": "Deployment",
                                "content": val,
                                "id": i,
                                "active": true
                            }
                        }))
                    else
                        retArr.push({
                            "name": depArr.metadata.name ? depArr.metadata.name : "Deployment 0",
                            "description": "Deployment",
                            "content": depArr,
                            "id": "D0",
                            "active": true
                        })

                } catch (err) { }
                try {
                    let serArr = await searchObjects('Service');
                    if (serArr.length && serArr.length > 0)
                        retArr = retArr.concat((serArr).map((val, i, arr) => {
                            return {
                                "name": val.metadata.name ? val.metadata.name : "Service " + i,
                                "description": "Service",
                                "content": val,
                                "id": i,
                                "active": true
                            }
                        }))
                    else
                        retArr.push({
                            "name": serArr.metadata.name ? serArr.metadata.name : "Service 0",
                            "description": "Service",
                            "content": serArr,
                            "id": "S0",
                            "active": true
                        })
                } catch (err) { }
                data = retArr;
            } catch (err) {
                data.error = err.message ? err.message : "Error: " + err.toString();
            }
        } else {
            try {
                let dbRes = await db.query(`
                    SELECT * FROM infrastructure;
                `, []);
                if (dbRes.rowCount > 0) {
                    status = 200;
                    data = dbRes.rows.map((val, i, arr) => {
                        val.active = false;
                        return val;
                    })
                }
            } catch (err) {
                data.error = err.message ? err.message : "Error: " + err.toString();
            }
        }
    }
    res.status(status).send(data);
}