const db = require('../../db/index')

exports.findReports = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined && typeof req.params.proj === 'string') {
        try {
            let dbWp = await db.query(`
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
                ($1 ANY web_projects.developers)
                AND web_projects.id=$2
            `, [req.user.id,req.params.proj]);
            if (dbWp.rowCount < 1)
                throw new Error("Web projects not found")
            let resDB = await db.query(`
                SELECT id,name
                    FROM scan_report
                WHERE
                    project=$1
                ORDER BY create_date DESC
            `, [dbWp.rows[0].id]);
            if (resDB.rows.length >= 1) {
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
                    SELECT *
                    FROM scan_report
                    WHERE 
                        id=$1
                        AND project=$2
                `, [req.params.name,req.params.proj]);
                if (resDB.rowCount < 1)
                    throw new Error()
                let dbWp = await db.query(`
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
                        ($1 ANY web_projects.developers)
                        AND web_projects.id=$2
                `, [req.user.id, resDB.rows[0].id]);

                if (dbWp.rowCount >= 1) {
                    status = 200;
                    data = resDB.rows[0];
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