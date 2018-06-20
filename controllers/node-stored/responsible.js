const db = require('../../db/index')
/**
 * Find all nodes for a certain pipline. 
 * Route: /api/pipeline/:name/node
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findNodes = async (req,res,next)=>{
    res.status(401).jsonp({ 'error': 'Unauthorized' })
}
exports.findNode = async (req,res,next)=>{
    res.status(401).jsonp({ 'error': 'Unauthorized' })
}
/**
 * Creates a new node for a certain pipeline
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createNode = async (req,res,next)=>{
    res.status(401).jsonp({ 'error': 'Unauthorized' })
}
exports.deleteNode = async (req,res,next)=>{
    res.status(401).jsonp({ 'error': 'Unauthorized' })
}
exports.updateNode = async (req,res,next)=>{
    res.status(401).jsonp({ 'error': 'Unauthorized' })
}