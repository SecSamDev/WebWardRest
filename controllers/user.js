const db = require('../db/index')

const subControllerDev = require('./user/developer');
const subControllerResp = require('./user/responsible')
const subControllerProjMan = require('./user/projectManager')
const subControllerAdmin = require('./user/admin')
/**
 * ExpressJS controller for creating a new user in the DBs.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.createUser = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.createUser(req, res, next); break;
            case 1: await subControllerResp.createUser(req, res, next); break;
            case 2: await subControllerProjMan.createUser(req, res, next); break;
            case 3: await subControllerAdmin.createUser(req, res, next); break;
        }
    }
    next();
}

/**
 * ExpressJS controller for creating a new user in the DBs.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.findUser = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.findUser(req, res, next); break;
            case 1: await subControllerResp.findUser(req, res, next); break;
            case 2: await subControllerProjMan.findUser(req, res, next); break;
            case 3: await subControllerAdmin.findUser(req, res, next); break;
        }
    }
    next();
}
/**
 * ExpressJS controller for finding users in the DB
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.findUsers = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.findUsers(req, res, next); break;
            case 1: await subControllerResp.findUsers(req, res, next); break;
            case 2: await subControllerProjMan.findUsers(req, res, next); break;
            case 3: await subControllerAdmin.findUsers(req, res, next); break;
        }
    }
    next();
}
/**
 * Update Users
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateUser = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.updateUser(req, res, next); break;
            case 1: await subControllerResp.updateUser(req, res, next); break;
            case 2: await subControllerProjMan.updateUser(req, res, next); break;
            case 3: await subControllerAdmin.updateUser(req, res, next); break;
        }
    }
    next();
}

exports.deleteUser = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.deleteUser(req, res, next); break;
            case 1: await subControllerResp.deleteUser(req, res, next); break;
            case 2: await subControllerProjMan.deleteUser(req, res, next); break;
            case 3: await subControllerAdmin.deleteUser(req, res, next); break;
        }
    }
    next();
}