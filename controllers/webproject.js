const db = require('../db/index')
const subControllerDev = require('./webproject/developer');
const subControllerResp = require('./webproject/responsible')
const subControllerProjMan = require('./webproject/projectManager')
const subControllerAdmin = require('./webproject/admin')
/**
 * ExpressJS controller for creating a new webProject
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.createWebProject = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.createWebProject(req, res, next); break;
            case 1: await subControllerResp.createWebProject(req, res, next); break;
            case 2: await subControllerProjMan.createWebProject(req, res, next); break;
            case 3: await subControllerAdmin.createWebProject(req, res, next); break;
        }
    }
    next();
}
/**
 * ExpressJS controller for update web projects.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.updateWebProject = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.updateWebProject(req, res, next); break;
            case 1: await subControllerResp.updateWebProject(req, res, next); break;
            case 2: await subControllerProjMan.updateWebProject(req, res, next); break;
            case 3: await subControllerAdmin.updateWebProject(req, res, next); break;
        }
    }
    next();
}
/**
 * ExpressJS controller for update web projects.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.deleteWebProject = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.deleteWebProject(req, res, next); break;
            case 1: await subControllerResp.deleteWebProject(req, res, next); break;
            case 2: await subControllerProjMan.deleteWebProject(req, res, next); break;
            case 3: await subControllerAdmin.deleteWebProject(req, res, next); break;
        }
    }
    next();
}
/**
 * ExpressJS controller for finding webProjects
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.findWebProject = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.findWebProject(req, res, next); break;
            case 1: await subControllerResp.findWebProject(req, res, next); break;
            case 2: await subControllerProjMan.findWebProject(req, res, next); break;
            case 3: await subControllerAdmin.findWebProject(req, res, next); break;
        }
    }
    next();
}
/**
 * ExpressJS controller for finding webProjects
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.findWebProjects = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.findWebProjects(req, res, next); break;
            case 1: await subControllerResp.findWebProjects(req, res, next); break;
            case 2: await subControllerProjMan.findWebProjects(req, res, next); break;
            case 3: await subControllerAdmin.findWebProjects(req, res, next); break;
        }
    }
    next();
}
