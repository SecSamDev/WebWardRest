const db = require('../../db/index')
/**
 * Find all nodes for a certain pipline. 
 * Route: /api/pipeline/:name/node
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findPipe = async (req, res, next) => {
    res.status(401).jsonp({ 'error': 'Unauthorized' })
}
/**
 * Find all nodes for a certain pipline. 
 * Route: /api/pipeline/:name/node
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findPipes = async (req, res, next) => {
    res.status(401).jsonp({ 'error': 'Unauthorized' })
}
/**
 * Creates a new node for a certain pipeline
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createPipeline = async (req, res, next) => {
    res.status(401).jsonp({ 'error': 'Unauthorized' })
}
exports.deletePipeline = async (req, res, next) => {
    res.status(401).jsonp({ 'error': 'Unauthorized' })
}
exports.updatePipeline = async (req, res, next) => {
    res.status(401).jsonp({ 'error': 'Unauthorized' })
}