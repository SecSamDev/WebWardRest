const db = require('../../db/index')

/**
 * ExpressJS controller for creating a new webProject
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.createWebProject = async (req, res, next) => {
    //Default response= Data not valid
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.body !== null && req.body !== undefined) {
        let name = "";
        if (req.body.name && typeof req.body.name == 'string')
            name = req.body.name;
        else
            throw new Error("Not a valid name")
        let description = (req.body.description && typeof req.body.description == 'string') ? req.body.description : "";
        status = 200;
        data = {};
        let project_manager;
        if (req.user.id && typeof req.user.id === 'string')
            project_manager = req.user.id;
        else
            throw new Error("Problem with user credentials");
        try {
            let dbresult = await db.query(`
                INSERT INTO web_projects 
                (name,description,project_manager) 
                VALUES 
                ($1,$2,$3)
            `, [name, description, project_manager]);
            status = 200;
            data = dbresult;
        } catch (err) {
            throw new Error(err.toString());
        }
    }
    res.status(status).send(data);
}
/**
 * ExpressJS controller for update web projects.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.updateWebProject = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.body !== null && req.body !== undefined) {
        let name = "";
        if (req.body.name && typeof req.body.name == 'string')
            name = req.body.name;
        else
            throw new Error("Not a valid name")
        let description = (req.body.description && typeof req.body.description == 'string') ? req.body.description : "";
        status = 200;
        data = {};
        let project_manager;
        if (req.user.id && typeof req.user.id === 'string')
            project_manager = req.user.id;
        else
            throw new Error("Problem with user credentials");
        try {
            let dbresult = await db.query(`
                UPDATE web_projects 
                SET name=$2,description=$3,project_manager=$4
                WHERE 
                    id=$1
            `, [req.body.id, name, description, project_manager]);
            status = 200;
            data = {};
        } catch (err) {
            throw new Error(err.toString());
        }
    }
    res.status(status).send(data);
}
/**
 * ExpressJS controller for update web projects.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.deleteWebProject = async (req, res, next) => {
    //Default response= Data not valid
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined) {
        if (req.params.name && typeof req.params.name === 'string') {
            try {
                let resDB = await db.query(`
                DELETE FROM web_projects 
                WHERE 
                    id=$1
                `, [req.params.name]);
                if (resDB.rowCount >= 1) {
                    status = 200;
                    data = {};
                }
                else {
                    throw new Error("Data not found")
                }
            } catch (err) {
                console.error(err)
            }
        }
    }
    res.status(status).send(data);
}
/**
 * ExpressJS controller for finding webProjects
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.findWebProject = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined && req.params.name && typeof req.params.name === 'string') {
        try {
            let resDB = await db.query(`
                SELECT 
                    web_projects.id,
                    web_projects.name,
                    web_projects.description,
                    web_projects.project_manager,
                    web_projects.create_date,
                    web_projects.last_update,
                    web_projects.status,
                    users.name AS project_manager_name  
                FROM web_projects 
                INNER JOIN users 
                    ON web_projects.project_manager=users.id
                WHERE 
                    web_projects.id=$1
            `, [req.params.name]);
            if (resDB.rows.length >= 1) {
                status = 200;
                data = resDB.rows[0];
            }
            else
                throw new Error("Data not found")
        } catch (err) {
            console.log(err)
        }
    }
    res.status(status).send(data);
}


exports.findWebProjects = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
        if (req.user.username === 'admin' && await db.isAdminPassDefault()) {
            //If the admin has the default password then show an alert
            status = 500;
            data = {'message' : 'Default admin password, please change it'}
        } else {
            let resDB = await db.query(`
        SELECT 
            web_projects.id,
            web_projects.name,
            web_projects.description,
            web_projects.project_manager,
            web_projects.create_date,
            web_projects.last_update,
            web_projects.status,
            users.name AS project_manager_name  
        FROM web_projects 
        INNER JOIN users 
            ON web_projects.project_manager=users.id
        `, []);
            if (resDB.rows.length >= 1) {
                status = 200;
                data = resDB.rows;
            }
            else
                throw new Error("Data not found")
        }


    } catch (err) {
        console.log(err)
    }
    res.status(status).send(data);
}
/**
 * 
 */