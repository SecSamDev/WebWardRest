const subControllerAdmin = require('./node-stored/admin')
const subControllerResp = require('./node-stored/responsible')
const subControllerProjMan = require('./node-stored/projectManager')
const subControllerDev = require('./node-stored/developer')


exports.findNode = async (req, res, next) => {

}
/**
 * Find all nodes for a certain pipline. 
 * Route: /api/pipeline/:name/node
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findNodes = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.findNodes(req, res, next); break;
            case 1: await subControllerResp.findNodes(req, res, next); break;
            case 2: await subControllerProjMan.findNodes(req, res, next); break;
            case 3: await subControllerAdmin.findNodes(req, res, next); break;
        }
    }
    next()
}
exports.findAllNodes = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.findNodes(req, res, next); break;
            case 1: await subControllerResp.findNodes(req, res, next); break;
            case 2: await subControllerProjMan.findNodes(req, res, next); break;
            case 3: await subControllerAdmin.findAllNodes(req, res, next); break;
        }
    }
    next()
}
/**
 * Creates a new node for a certain pipeline
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createNode = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.createNode(req, res, next); break;
            case 1: await subControllerResp.createNode(req, res, next); break;
            case 2: await subControllerProjMan.createNode(req, res, next); break;
            case 3: await subControllerAdmin.createNode(req, res, next); break;
        }
    }
    next()
}
exports.deleteNode = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.deleteNode(req, res, next); break;
            case 1: await subControllerResp.deleteNode(req, res, next); break;
            case 2: await subControllerProjMan.deleteNode(req, res, next); break;
            case 3: await subControllerAdmin.deleteNode(req, res, next); break;
        }
    }
    next()
}
exports.updateNode = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.updateNode(req, res, next); break;
            case 1: await subControllerResp.updateNode(req, res, next); break;
            case 2: await subControllerProjMan.updateNode(req, res, next); break;
            case 3: await subControllerAdmin.updateNode(req, res, next); break;
        }
    }
    next()
}

exports.getTemplates = async (req, res, next) => {
    if(process.pipe_node_templates && process.pipe_node_templates.length > 0){
        res.status(200).jsonp(process.pipe_node_templates);
    }else{
        res.status(200).jsonp([]);
    }
    next()
}