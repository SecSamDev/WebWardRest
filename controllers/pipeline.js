const subControllerAdmin = require('./pipeline/admin')
const subControllerResp = require('./pipeline/responsible')
const subControllerProjMan = require('./pipeline/projectManager')
const subControllerDev = require('./pipeline/developer')

exports.findPipeline = async (req,res,next)=>{
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.findPipe(req, res, next); break;
            case 1: await subControllerResp.findPipe(req, res, next); break;
            case 2: await subControllerProjMan.findPipe(req, res, next); break;
            case 3: await subControllerAdmin.findPipe(req, res, next); break;
        }
    }
    next()
}
exports.findPipelines = async (req,res,next)=>{
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.findPipes(req, res, next); break;
            case 1: await subControllerResp.findPipes(req, res, next); break;
            case 2: await subControllerProjMan.findPipes(req, res, next); break;
            case 3: await subControllerAdmin.findPipes(req, res, next); break;
        }
    }
    next()
}
exports.createPipeline = async (req,res,next)=>{
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.createPipeline(req, res, next); break;
            case 1: await subControllerResp.createPipeline(req, res, next); break;
            case 2: await subControllerProjMan.createPipeline(req, res, next); break;
            case 3: await subControllerAdmin.createPipeline(req, res, next); break;
        }
    }
    next()
}
exports.deletePipeline = async (req,res,next)=>{
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.deletePipeline(req, res, next); break;
            case 1: await subControllerResp.deletePipeline(req, res, next); break;
            case 2: await subControllerProjMan.deletePipeline(req, res, next); break;
            case 3: await subControllerAdmin.deletePipeline(req, res, next); break;
        }
    }
    next()
}
exports.updatePipeline = async (req,res,next)=>{
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.updatePipeline(req, res, next); break;
            case 1: await subControllerResp.updatePipeline(req, res, next); break;
            case 2: await subControllerProjMan.updatePipeline(req, res, next); break;
            case 3: await subControllerAdmin.updatePipeline(req, res, next); break;
        }
    }
    next()
}
 