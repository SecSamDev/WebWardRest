const subControllerAdmin = require('./threat-model/admin')
const subControllerResp = require('./threat-model/responsible')
const subControllerProjMan = require('./threat-model/projectManager')
const subControllerDev = require('./threat-model/developer')

exports.findThreatModels = async (req,res,next)=>{
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.findPipe(req, res, next); break;
            case 1: await subControllerResp.findPipe(req, res, next); break;
            case 2: await subControllerProjMan.findPipe(req, res, next); break;
            case 3: await subControllerAdmin.findThreatModels(req, res, next); break;
        }
    }
}
exports.findThreatModel = async (req,res,next)=>{
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.findPipes(req, res, next); break;
            case 1: await subControllerResp.findPipes(req, res, next); break;
            case 2: await subControllerProjMan.findPipes(req, res, next); break;
            case 3: await subControllerAdmin.findThreatModel(req, res, next); break;
        }
    }
}
exports.createThreatModel = async (req,res,next)=>{
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.createPipeline(req, res, next); break;
            case 1: await subControllerResp.createPipeline(req, res, next); break;
            case 2: await subControllerProjMan.createPipeline(req, res, next); break;
            case 3: await subControllerAdmin.createThreatModel(req, res, next); break;
        }
    }
}
exports.deleteThreatModel = async (req,res,next)=>{
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.deletePipeline(req, res, next); break;
            case 1: await subControllerResp.deletePipeline(req, res, next); break;
            case 2: await subControllerProjMan.deletePipeline(req, res, next); break;
            case 3: await subControllerAdmin.deleteThreatModel(req, res, next); break;
        }
    }
}
exports.updateThreatModel = async (req,res,next)=>{
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.updatePipeline(req, res, next); break;
            case 1: await subControllerResp.updatePipeline(req, res, next); break;
            case 2: await subControllerProjMan.updatePipeline(req, res, next); break;
            case 3: await subControllerAdmin.updateThreatModel(req, res, next); break;
        }
    }
}