const db = require('../../db/index')
/**
 * This library allow us to store data as a security report in the DB
 * @param {PipelineNode} node 
 */
function generateInjectionFunction(node) {
    return async function (report, reporter = 'WebWard') {
        try {
            if (!(node && node.pipe && typeof node.pipe.id === 'string')) {
                throw new Error("Not valid Pipe ID")
            }
            let pipeID = node.pipe.id;
            let dbPIPE = await db.query(`
                SELECT web_project, name
                FROM   pipelines
                WHERE  
                    id=$1
                LIMIT  1
            `, [pipeID])
            if (!(dbPIPE.rowCount === 1 && dbPIPE.rows[0].web_project))
                throw new Error("Not found")
            let dbRES = await db.query(`
                INSERT INTO scan_report 
                    (project,data,name,reporter) 
                VALUES 
                    ($1, $2, $3, $4);
            `, [dbPIPE.rows[0].web_project, report, (dbPIPE.rows[0].name + "::" + Date.now().toString()),reporter])
        } catch (err) {
            throw Error("Could not save data")
        }
    }
}
exports.generateInjectionFunction = generateInjectionFunction;