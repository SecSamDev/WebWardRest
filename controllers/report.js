const subControllerAdmin = require('./reports/admin')
const subControllerResp = require('./reports/responsible')
const subControllerProjMan = require('./reports/projectManager')
const subControllerDev = require('./reports/developer')


exports.findReports = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.findReports(req, res, next); break;
            case 1: await subControllerResp.findReports(req, res, next); break;
            case 2: await subControllerProjMan.findReports(req, res, next); break;
            case 3: await subControllerAdmin.findReports(req, res, next); break;
        }
    }
    next()
}
exports.findReport = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.findReport(req, res, next); break;
            case 1: await subControllerResp.findReport(req, res, next); break;
            case 2: await subControllerProjMan.findReport(req, res, next); break;
            case 3: await subControllerAdmin.findReport(req, res, next); break;
        }
    }
    next()
}
exports.deleteReport = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)))
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {
        switch (req.user.role) {
            case 0: await subControllerDev.deleteReport(req, res, next); break;
            case 1: await subControllerResp.deleteReport(req, res, next); break;
            case 2: await subControllerProjMan.deleteReport(req, res, next); break;
            case 3: await subControllerAdmin.deleteReport(req, res, next); break;
        }
    }
    next()
}