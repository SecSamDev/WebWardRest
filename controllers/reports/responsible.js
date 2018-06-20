const db = require('../../db/index')

exports.findReports = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined && req.params.proj) {
        try {
            let resDB = await db.query(`
                SELECT 
                    web_projects.id,
                    web_projects.name,
                    web_projects.description,
                    web_projects.project_manager,
                    users.name AS project_manager_name 
                FROM web_projects 
                INNER JOIN users 
                    ON web_projects.project_manager=users.id
                WHERE 
                        users.manager=$1
                    AND
                        web_projects.id=$2
            `, [req.user.id, req.params.proj]);
            if (resDB.rows.length >= 1) {
                let resDB = await db.query(`
                SELECT id,name
                    FROM scan_report
                WHERE
                    project=$1
                ORDER BY create_date DESC
            `, [req.params.proj]);
                status = 200;
                data = resDB.rows;
            }
            else
                throw new Error("Data not found")
        } catch (err) { }
    }
    res.status(status).send(data);
}
exports.findReport = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined) {
        if (req.params.name && typeof req.params.name === 'string' && typeof req.params.proj === 'string') {
            try {
                let resDB = await db.query(`
                    SELECT id,name,project
                        FROM scan_report
                    WHERE
                        id=$1
                        AND project=$2
                `, [req.params.name,req.params.proj]);
                if (resDB.rowCount < 1)
                    throw new Error("Not found")
                let dbWP = await db.query(`
                SELECT 
                    web_projects.id,
                    web_projects.name,
                    web_projects.description,
                    web_projects.project_manager,
                    users.name AS project_manager_name 
                FROM web_projects 
                INNER JOIN users 
                    ON web_projects.project_manager=users.id
                WHERE 
                        users.manager=$1
                    AND
                        web_projects.id=$2
            `, [req.user.id, req.params.proj]);
                if (dbWP.rowCount >= 1) {
                    status = 200;
                    data = dbWP.rows[0];
                }
                else
                    throw new Error("Data not found")
            } catch (err) { }
        }
    }
    res.status(status).send(data);
}
exports.deleteReport = async (req, res, next) => {
    res.status(401).jsonp({ 'error': 'Unauthorized' });
}