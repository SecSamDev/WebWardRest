const {ArachniAPI} = require('../ww_libraries/arachni/arachni-REST')
const util = require('util')

/**
 * Get a certain report. Ex: /arachni/rest/asdf89fas9fa8a98as
 * Returns: {......}
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getReportREST = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3 && req.params.name) {
        try {
            const arach = new ArachniAPI();
            arach.scanID = req.params.name;
            let reportArach = util.promisify(arach.getJSONReport)
            let resp = await (reportArach.bind(arach))();
            if(resp ){
                data = resp;
                status = 200;
                console.log(resp)
                if(resp.length >0){
                    //No se como va
                }else{
                }
            }
        } catch (err) {
            console.log(err)
            data.error = 'Error loading Module from URL'
        }
    }
    res.status(status).send(data);
}
exports.getReportsREST = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3) {
        try {
            const arach = new ArachniAPI();
            let pingArch = util.promisify(arach.pingArachni)
            let resp = await (pingArch.bind(arach))();
            if(resp ){
                data = resp;
                status = 200;
                console.log(resp)
                if(resp.length >0){
                    //No se como va
                }else{
                }
            }
        } catch (err) {
            console.log(err)
            data.error = 'Error loading Module from URL'
        }
    }
    res.status(status).send(data);
}

exports.deleteReportREST = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3 && req.params.name) {
        try {
            const arach = new ArachniAPI();
            arach.scanID = req.params.name;
            let reportArach = util.promisify(arach.shutdownScan)
            let resp = await (reportArach.bind(arach))();
            if(resp ){
                data = resp;
                status = 200;
                console.log(resp)
                if(resp.length >0){
                    //No se como va
                }else{
                }
            }
        } catch (err) {
            console.log(err)
            data.error = 'Error loading Module from URL'
        }
    }
    res.status(status).send(data);
}




exports.findPipelines = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)) && req.user.role == 3)
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {

    }
    next()
}
exports.createPipeline = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)) && req.user.role == 3)
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {

    }
    next()
}
exports.deletePipeline = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)) && req.user.role == 3)
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {

    }
    next()
}
exports.updatePipeline = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || !('role' in req.user)) && req.user.role == 3)
    ) {
        res.status(401).send({ 'error': 'Unauthorized' });
    } else {

    }
    next()
}
