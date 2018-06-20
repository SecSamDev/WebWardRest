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
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && (req.user === "" || (req.user.role && req.user.role < 2)))
    ) {
        res.status(401);
        throw new Error("Unauthorized");
    } else {
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
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && req.user === "")
    ) {
        status = 401;
        data = { message: 'Unauthorized' };
    } else {
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
                    id=$1 AND (project_manager=$5 OR $6=3)
                `, [req.body.id, name, description, project_manager, req.user.id, req.user.role]);
                status = 200;
                data = {};
            } catch (err) {
                throw new Error(err.toString());
            }
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
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && req.user === "")
    ) {
        status = 401;
        data = { message: 'Unauthorized' };
    } else {
        if (req.params !== null && req.params !== undefined) {

            if (req.params.name && typeof req.params.name === 'string') {
                try {
                    let resDB = await db.query(' DELETE FROM web_projects WHERE id=$1 AND (project_manager=$2 OR $3=3)', [req.params.name, req.user.id, req.user.role]);
                    if (resDB.rowCount >= 1) {
                        status = 200;
                        data = {};
                    }
                    else {
                        throw new Error("Data not found")
                    }

                } catch (err) {
                    console.log(err)
                    data = err;
                }
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
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && req.user === "")
    ) {
        status = 401;
        data = { message: 'Unauthorized' };
    } else {
        if (req.params !== null && req.params !== undefined) {
            if (req.params.name && typeof req.params.name === 'string') {
                try {
                    if (req.user.role === 1) {
                        let managersDB = await db.query('SELECT id FROM users WHERE manager=$1', [req.user.id]);
                        let managersID = [];
                        if (managersDB.rows.length < 1)
                            throw new Error("Data not found")
                        for (var i = 0; i < managersDB.rows.length; i++) {
                            managersID.push(managersDB.rows[i].id);
                        }
                        managersID = managersID.join(',');
                        let resDB = await db.query(`
                        SELECT 
                            web_projects.name,
                            web_projects.description,
                            web_projects.project_manager,
                            users.name AS project_manager_name 
                        FROM web_projects 
                        INNER JOIN users 
                            ON web_projects.project_manager=users.id
                        WHERE 
                            web_projects.name=$1 
                            AND (web_projects.project_manager IN ($2)) 
                        `,
                            [req.params.name, managersID]);
                        if (resDB.rows.length >= 1) {
                            status = 200;
                            data = resDB.rows;
                        }
                        else
                            throw new Error("Data not found")
                    } else {
                        let resDB = await db.query(`
                        SELECT 
                            web_projects.name,
                            web_projects.description,
                            web_projects.project_manager,
                            users.name AS project_manager_name  
                        FROM web_projects 
                        INNER JOIN users 
                            ON web_projects.project_manager=users.id
                        WHERE 
                            web_projects.name=$1 
                            AND (project_manager=$2 OR $3=3)
                        `, 
                        [req.params.name, req.user.id, req.user.role]);
                        if (resDB.rows.length >= 1) {
                            status = 200;
                            data = resDB.rows;
                        }
                        else
                            throw new Error("Data not found")
                    }

                } catch (err) { }
            } else {
                try {
                    if (req.user.role === 1) {
                        
                        let managersDB = await db.query(`SELECT id FROM users WHERE manager=$1`, [req.user.id]);
                        let managersID = [];
                        if (managersDB.rows.length < 1)
                            throw new Error("Data not found")
                        for (var i = 0; i < managersDB.rows.length; i++) {
                            managersID.push(managersDB.rows[i].id);
                        }
                        managersID = managersID.join(',');
                        
                        let resDB = await db.query(`
                        SELECT 
                            web_projects.name,
                            web_projects.description,
                            web_projects.project_manager,
                            users.name AS project_manager_name  
                        FROM web_projects 
                        INNER JOIN users 
                            ON web_projects.project_manager=users.id
                        WHERE 
                            (web_projects.project_manager IN ($1))
                        `,[managersID]);
                        if (resDB.rows.length >= 1) {
                            status = 200;
                            data = resDB.rows;
                        }
                        else
                            throw new Error("Data not found")
                    } else {
                        let resDB = await db.query(`
                        SELECT 
                            web_projects.name,
                            web_projects.description,
                            web_projects.project_manager,
                            users.name AS project_manager_name  
                        FROM web_projects 
                        INNER JOIN users 
                            ON web_projects.project_manager=users.id
                        WHERE 
                            (web_projects.project_manager=$1 OR $2=3)
                        `, [req.user.id, req.user.role]);
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
            }
        }
    }
    res.status(status).send(data);
}
