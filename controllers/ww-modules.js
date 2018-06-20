const db = require('../db/index')
const { loadModulesFromURL, loadModulesFromDirectory,checkModuleInURL } = require('../modules/loader')
const { URL } = require('url')

/*
 * We dont need subcontrollers for the roles because only the admin can use infraestructure
*/
exports.registerWWModule = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3) {
        try {
            let origin = "";
            if (req.body.origin && typeof req.body.origin === 'string')
                origin = (new URL(req.body.origin)).href;
            else
                throw new Error("No valid URL")
            let mod = await loadModulesFromURL(origin.toString())
            console.log("Load module: " + mod.tag)
            if(typeof mod.tag === 'string' && mod.tag.length < 125)
                name = mod.tag;
            else
                throw new Error("Tag name not valid")
            let value = {
                requires : mod.requires,
                libraries : mod.libraries
            }
            let dbRes = await db.query(`
            INSERT INTO ww_modules
            (name,origin,value) 
            VALUES 
                ($1,$2,$3)
            `, [name, origin, value]);
            if (dbRes.rowCount > 0 || (dbRes.rows && dbRes.rows.length > 0)) {
                status = 200;
                data = dbRes.rows;
            }
        } catch (err) {
            data.error = 'Error loading Module from URL'
        }
    }
    res.status(status).send(data);
}
/**
 * Validates a WebWard Module, then it can be loaded.
 * TODO: improve system
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.validModuleInURL = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3) {
        try {
            let origin = "";
            if (req.body.origin && typeof req.body.origin === 'string')
                origin = new URL(req.body.origin);
            else
                throw new Error("No valid URL")
            let mod = await checkModuleInURL(origin)
            if(!mod)
                throw new Error("No valid Module")
            if(typeof mod.tag === 'string' && mod.tag.length < 125)
                name = mod.tag;
            else
                throw new Error("Tag name not valid")
            let requires = mod.requires;
            let libraries = mod.libraries;
            let ret = mod.toJSON();
            ret.name = ret.tag;
            data = ret;
            status = 200;
        } catch (err) {
            console.log(err)
            data.error = 'Error loading Module from URL'
        }
    }
    res.status(status).send(data);
}

exports.deleteWWModule = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined && req.params.name && typeof req.params.name === 'string') {
        try {
            let resDB = await db.query(`
            DELETE FROM ww_modules 
            WHERE 
                name=$1
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

exports.findWWModule = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role >= 0 && req.params && 'name' in req.params) {
        try {
            let dbRes = await db.query('SELECT * FROM ww_modules WHERE name=$1', [req.params.name]);
            if (dbRes.rows.length > 0) {
                status = 200;
                data = dbRes.rows.map((val,i,arr)=>{
                    if(val.value){
                        val.requires = val.value.requires ? val.value.requires : [];
                        val.libraries = val.value.libraries ? val.value.libraries : [];
                    }
                    return val;
                });
                data = data[0];
            }
        } catch (err) { }
    }
    res.status(status).send(data);
}
exports.findWWModules = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not valid' }
    if (req.user && req.user.role >= 0) {
        try {
            let dbRes = await db.query('SELECT * FROM ww_modules ORDER BY name;', []);
            if (dbRes.rows.length > 0) {
                status = 200;
                data = dbRes.rows.map((val,i,arr)=>{
                    if(val.value){
                        val.requires = val.value.requires ? val.value.requires : [];
                        val.libraries = val.value.libraries ? val.value.libraries : [];
                    }
                    return val;
                });
            }
        } catch (err) { }
    }
    res.status(status).send(data);
}