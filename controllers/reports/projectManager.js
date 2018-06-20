const db = require('../../db/index')
const util = require('util')

exports.findReports = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined && req.params.proj) {
        try {
            let resDB = await db.query(`
                SELECT 
                    *
                FROM web_projects 
                WHERE 
                        web_projects.project_manager=$1
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
        if (req.params.name && typeof req.params.proj === 'string' && typeof req.params.name === 'string') {
            try {
                let resDB = await db.query(`
                    SELECT *
                    FROM scan_report
                    WHERE 
                        id=$1
                        AND project=$2
                `, [req.params.name, req.params.proj]);
                if (resDB.rowCount < 1)
                    throw new Error()
                let dbWp = await db.query(`
                    SELECT 
                        *
                    FROM web_projects 
                    WHERE 
                            web_projects.project_manager=$1
                        AND
                            web_projects.id=$2
                `, [req.user.id, req.params.proj]);
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
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined) {
        if (req.params.name && typeof req.params.name === 'string' && typeof req.params.proj === 'string') {
            try {
                let dbWp = await db.query(`
                    SELECT 
                        *
                    FROM web_projects 
                    INNER JOIN scan_report
                        ON scan_report.project=web_projects.id
                    WHERE 
                        web_projects.project_manager=$1
                        AND
                        scan_report.id=$2
                        AND web_projects.id=$3
                `, [req.user.id, req.params.name, req.params.proj]);
                if (dbWP.rowCount < 1)
                    throw new Error("Data not valid");
                let resDB = await db.query(`
                DELETE FROM scan_report 
                WHERE 
                    id=$1
                    AND project=$2
                `, [req.params.name, req.params.proj]);
                if (resDB.rowCount >= 1) {
                    status = 200;
                    data = {};
                }
            } catch (err) {
                status = 500;
                data = { message: err.message };
            }
        }
    }
    res.status(status).send(data);
}