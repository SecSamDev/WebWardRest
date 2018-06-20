const db = require('../db/index')
const {
    searchObjects,updateObject,deleteObject,createObject
} = require('../kube/deployer')
/*
 * Allow us to deploy objects. Independiently of the deployment platform
*/
exports.createKubeObject = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3 && req.body.infrastructure) {
        try {
            await createObject(req.body.infrastructure);
        } catch (err) {}
    }
    res.status(status).send(data);
}

exports.deleteKubeObject = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3 && req.body.infrastructure) {
        try {
            await deleteObject(req.body.infrastructure);
        } catch (err) {}
    }
    res.status(status).send(data);
}
exports.updateKubeObject = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3 && req.body.infrastructure) {
        try {
            await updateObject(req.body.infrastructure);
        } catch (err) {}
    }
    res.status(status).send(data);
}

exports.findKubeObject = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3 && req.params.kind) {
        try {
            await searchObjects(req.params.kind);
        } catch (err) {}
    }
    res.status(status).send(data);
}
exports.findKubeObject = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3 && req.params.kind) {
        try {
            await searchObjects(req.params.kind);
        } catch (err) {}
    }
    res.status(status).send(data);
}