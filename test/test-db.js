const db = require('../db/index')
async function test1() {
    try {
        await db.connect()
        let dbPIPE = await db.query(`
        SELECT web_project
        FROM   pipelines
        WHERE  
            id=$1
        LIMIT  1
    `, ["70e899b4-5f5f-11e8-b1a2-a7c714d4a8f4"])
        if(!(dbPIPE.rowCount === 1 && dbPIPE.rows[0].web_project))
            throw new Error("Not found")
        let dbRES = await db.query(`
        INSERT INTO scan_report 
            (project,data) 
        VALUES 
            ($1, $2);
    `, [dbPIPE.rows[0].web_project, { "mydata": "my value" }])
    } catch (err) {
    }
}
test1()