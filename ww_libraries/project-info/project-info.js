const db = require('../../db/index')
/**
 * This library allow us to modify the information stored by the web_project, to get an inventory of dependencies that the project uses
 * @param {PipelineNode} node 
 */
function generateInjectionFunction(node) {
    return async function (values,changeOn) {
        if(!(changeOn === 'platform' || changeOn === 'system')){
            throw new Error("Could not save")
        }
        try {
            if (!(node && node.pipe && typeof node.pipe.id === 'string')) {
                throw new Error("Not valid Pipe ID")
            }
            let pipeID = node.pipe.id;
            let dbPIPE = await db.query(`
                SELECT web_projects.*
                FROM   web_projects
                INNER JOIN pipelines
                    ON web_projects.id=pipelines.web_project
                WHERE  
                    pipelines.id=$1
                LIMIT  1
            `, [pipeID])
            if (!(dbPIPE.rowCount === 1 && dbPIPE.rows[0].web_project))
                throw new Error("Not found")
            let platform = dbPIPE.rows[0].platform;
            let system = dbPIPE.rows[0].system;
            if(changeOn === 'platform' ){
                overwriteValues(platform,values)
            }else{
                overwriteValues(system,values)
            }
            let dbRES = await db.query(`
                UPDATE web_projects
                    SET platform=$2,system=$3
                WHERE id=$1
            `, [dbPIPE.rows[0].id, report, platform,system])
        } catch (err) {
            throw Error("Could not save data")
        }
    }
}
exports.generateInjectionFunction = generateInjectionFunction;

function overwriteValues(oldVals,newVals){
    return Object.assign(oldVals,newVals)
}