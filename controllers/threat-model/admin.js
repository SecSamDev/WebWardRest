const db = require('../../db/index')
const multer = require('multer')
const path = require('path')
const fileSanitize = require("sanitize-filename");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        if (req.params.id) {
            cb(null, fileSanitize(req.params.id + '__' + Date.now() + path.extname(file.originalname)))
        } else {
            cb({ 'message': "No valid body ID", 'code': 1 })
        }

    }
})

const upload = multer({
    dest: (process.env.UPLOAD_DIR ? process.env.UPLOAD_DIR : 'uploads/'),
    storage: storage,
    limits: {
        fileSize: 4000000,
        files: 2,
    }
})

const thUpload = upload.fields([
    { name: 'threatModelFile', maxCount: 1 },
    { name: 'threatModelReport', maxCount: 1 },
    { name: 'threatModelTemplate', maxCount: 1 }
]);


exports.findThreatModel = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
        if (!req.params.proj || !req.params.id)
            throw new Error("Error")
        let resDB = await db.query(`
        SELECT 
            *
        FROM threat_model
        WHERE
            project=$1 AND
            id=$2
    `, [req.params.proj, req.params.id]);
        if (resDB.rows.length >= 1) {
            status = 200;
            data = resDB.rows[0];
        }
        else
            throw new Error("Data not found")
    } catch (err) { }
    res.status(status).send(data);
}
/**
 * Find all nodes for a certain pipline. 
 * Route: /api/pipeline/:name/node
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findThreatModels = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
        if (req.params.proj && typeof req.params.proj == 'string') {
            let resDB = await db.query(`
                SELECT *
                    FROM threat_model
                WHERE
                    project=$1
                ORDER BY name DESC, version DESC, review DESC
            `, [req.params.proj]);
            if (resDB.rows.length >= 1) {
                status = 200;
                data = resDB.rows;
            }
        } else {
            throw new Error("Data not found")
        }
    } catch (err) { }
    res.status(status).send(data);
}
/**
 * Creates a new node for a certain pipeline
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createThreatModel = async (req, res, next) => {
    //Default response= Data not valid
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.body !== null && req.body !== undefined && req.params && typeof req.params.proj === 'string') {
        try {
            //Now that exists then parse data
            let name = "";
            if (req.body.name && typeof req.body.name == 'string')
                name = req.body.name;
            else
                throw new Error("Not a valid NAME")
            let web_project = req.params.proj;
            let description = "";
            if (req.body.description && typeof req.body.description == 'string')
                description = req.body.description;
            let applicationType = "WebProj";
            if (req.body.aplicationType && typeof req.body.applicationType == 'string')
                applicationType = req.body.applicationType;
            let owners = [req.user.id];
            let authors = [req.user.id];
            let stakeholders = [req.user.id];
            let url = "";
            if (req.body.url && typeof req.body.url == 'string')
                url = req.body.url;
            let dbresult = await db.query(`
                INSERT INTO threat_model 
                    (name,project,description,applicationType,
                        owners,authors,stakeholders,url) 
                VALUES 
                    ($1,$2,$3,$4,$5,$6,$7,$8)
                RETURNING id;
            `, [name, web_project, description, applicationType,
                    owners, authors, stakeholders, url]);
            status = 200;
            data = {};
            if (dbresult.rowCount === 1) {
                data = dbresult.rows[0];
            }
        } catch (err) { }
    }
    res.status(status).send(data);
}
exports.deleteThreatModel = async (req, res, next) => {
    //Default response= Data not valid
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined) {
        if (req.params.id && typeof req.params.id === 'string' && typeof req.params.proj === 'string') {
            try {
                let resDB = await db.query(`
                DELETE FROM threat_model 
                WHERE 
                    id=$1 AND project=$2
                `, [req.params.id, req.params.proj]);
                if (resDB.rowCount >= 1) {
                    status = 200;
                    data = {};
                }
                else {
                    throw new Error("Data not found")
                }
            } catch (err) { }
        }
    }
    res.status(status).send(data);
}
exports.updateThreatModel = (req, res, next) => {
    thUpload(req, res, async (err) => {
        if (err) {
            res.status(500).jsonp({ message: 'Fail to upload Files' });
        } else {
            let status = 500;
            let data = { message: 'Data not valid' };
            if (req.body !== null && req.body !== undefined
                && req.params.id && req.params.proj) {
                try {
                    let resDB;
                    if (req.body.id) {
                        resDB = await db.query(`
                        SELECT *
                            FROM threat_model
                        WHERE
                            id=$1
                    `, [req.body.id]);
                    } else {
                        resDB = await db.query(`
                        SELECT *
                            FROM threat_model
                        WHERE
                            project=$1
                    `, [req.params.proj]);
                    }

                    if (resDB.rows.length < 1) {
                        throw new Error("Not found")
                    }
                    if (req.files && (req.files.threatModelTemplate)) {
                        //Full new version = new DB entry
                        //---------------CHECK FILE
                        let queryParams = "";
                        let queryArray = [];
                        let nParams = 0;
                        queryArray.push(resDB.rows[0].name);
                        queryParams += (nParams++ > 0 ? ", " : "") + "name";
                        queryArray.push(resDB.rows[0].description);
                        queryParams += (nParams++ > 0 ? ", " : "") + "description";
                        queryArray.push(resDB.rows[0].url);
                        queryParams += (nParams++ > 0 ? ", " : "") + "url";
                        queryArray.push(resDB.rows[0].owners);
                        queryParams += (nParams++ > 0 ? ", " : "") + "owners";
                        queryArray.push(resDB.rows[0].authors);
                        queryParams += (nParams++ > 0 ? ", " : "") + "authors";
                        queryArray.push(resDB.rows[0].stakeholders);
                        queryParams += (nParams++ > 0 ? ", " : "") + "stakeholders";
                        queryArray.push(req.files.threatModelTemplate[0].filename);
                        queryParams += (nParams++ > 0 ? ", " : "") + "threatModelTemplate";
                        if (resDB.rows[0].threatmodelfile) {
                            queryArray.push(resDB.rows[0].threatmodelfile);
                            queryParams += (nParams++ > 0 ? ", " : "") + "threatModelFile";
                        }
                        if (resDB.rows[0].threatmodelreport) {
                            queryArray.push(resDB.rows[0].threatmodelreport);
                            queryParams += (nParams++ > 0 ? ", " : "") + "threatModelReport";
                        }
                        queryArray.push((resDB.rows[0].version) + 1);
                        queryParams += (nParams++ > 0 ? ", " : "") + "version";
                        queryArray.push(1);
                        queryParams += (nParams++ > 0 ? ", " : "") + "review";
                        queryParams += (nParams++ > 0 ? ", " : "") + "project";
                        queryArray.push(req.params.proj)
                        let dbRes = await db.query(`
                            INSERT INTO threat_model 
                                (${queryParams})
                            VALUES 
                                (${generateNum0Array(nParams)})
                            RETURNING id;
                        `, queryArray);
                        if (dbRes.rowCount > 0) {
                            status = 200;
                            data = dbRes.rows[0];
                        }
                    } else {
                        let queryParams = "";
                        let queryArray = [req.body.id, req.params.proj];
                        let nParams = 2;
                        if (req.body.name && typeof req.body.name == 'string') {
                            queryArray.push(req.body.name);
                            queryParams += (nParams > 2 ? ", " : "") + "name=$" + ++nParams;
                        }
                        if (req.body.url && typeof req.body.url == 'string') {
                            queryArray.push(req.body.url);
                            queryParams += (nParams > 2 ? ", " : "") + "url=$" + ++nParams;
                        }
                        if (req.body.description && typeof req.body.description == 'string') {
                            queryArray.push(req.body.description);
                            queryParams += (nParams > 2 ? ", " : "") + "description=$" + ++nParams;
                        }
                        if (req.body.owners && req.body.owners.length) {
                            queryArray.push(req.body.owners);
                            queryParams += (nParams > 2 ? ", " : "") + "owners=$" + ++nParams;
                        }
                        if (req.body.authors && req.body.authors.length) {
                            queryArray.push(req.body.authors);
                            queryParams += (nParams > 2 ? ", " : "") + "authors=$" + ++nParams;
                        }
                        if (req.body.stakeholders && req.body.stakeholders.length) {
                            queryArray.push(req.body.stakeholders);
                            queryParams += (nParams > 2 ? ", " : "") + "stakeholders=$" + ++nParams;
                        }
                        if (req.files && req.files.threatModelFile && req.files.threatModelFile.length > 0) {
                            queryArray.push(req.files.threatModelFile[0].filename);
                            queryParams += (nParams > 2 ? ", " : "") + "threatModelFile=$" + ++nParams;
                        } else {
                            if (resDB.rows[0].threatmodelfile) {
                                queryArray.push(resDB.rows[0].threatmodelfile);
                                queryParams += (nParams > 2 ? ", " : "") + "threatModelFile=$" + ++nParams;
                            }
                        }
                        if (req.files && req.files.threatModelReport && req.files.threatModelReport.length > 0) {
                            queryArray.push(req.files.threatModelReport[0].filename);
                            queryParams += (nParams > 2 ? ", " : "") + "threatModelReport=$" + ++nParams;
                        } else {
                            if (resDB.rows[0].threatmodelreport) {
                                queryArray.push(resDB.rows[0].threatmodelreport);
                                queryParams += (nParams > 2 ? ", " : "") + "threatModelReport=$" + ++nParams;
                            }
                        }
                        if (resDB.rows[0].threatmodeltemplate) {
                            queryArray.push(resDB.rows[0].threatmodeltemplate);
                            queryParams += (nParams > 2 ? ", " : "") + "threatModelTemplate=$" + ++nParams;
                        }
                        //Revision only= same DB entry
                        if (queryArray.length === 2) {
                            throw new Error("Data not valid")
                        }
                        queryArray.push((resDB.rows[0].version));
                        queryParams += (nParams > 2 ? ", " : "") + "version=$" + ++nParams;
                        queryArray.push((resDB.rows[0].review + 1));
                        queryParams += (nParams > 2 ? ", " : "") + "review=$" + ++nParams;
                        let dbRes = await db.query(`
                            UPDATE threat_model 
                            SET ${queryParams}
                            WHERE 
                                id=$1
                                AND project=$2
                            RETURNING *
                        `, queryArray);
                        if (dbRes.rowCount > 0) {
                            status = 200;
                            data = {};
                        }
                    }

                } catch (err) {
                    console.log(err)
                    status = 500;
                    data.message = err.message;
                }
            }
            res.status(status).jsonp(data);
        }
    })
}
function generateNum0Array(nParams, from = 1) {
    let ret = "";
    for (let i = from; i < nParams; i++) {
        ret += "$" + i + ","
    }
    ret += "$" + (nParams);
    return ret;
}