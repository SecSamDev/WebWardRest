const db = require('../../db/index')
const util = require('util')

exports.findReports = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined && typeof req.params.proj === 'string') {
        try {
            let resDB = await db.query(`
                SELECT *
                FROM 
                    scan_report
                WHERE 
                    project=$1
                ORDER BY create_date DESC
            `, [req.params.proj]);
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
    if (req.params !== null && req.params !== undefined && typeof req.params.proj === 'string' && typeof req.params.name === 'string') {
        try {
            let resDB = await db.query(`
                SELECT *
                FROM 
                    scan_report
                WHERE 
                    id=$1 AND
                    project=$2
            `, [req.params.name, req.params.proj]);
            if (resDB.rows.length >= 1) {
                status = 200;
                data = resDB.rows[0];
            }
            else
                throw new Error("Data not found")
        } catch (err) { }
    }
    res.status(status).send(data);
}
exports.deleteReport = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined) {
        if (req.params.name && typeof req.params.name === 'string' && typeof req.params.proj === 'string') {
            try {
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


