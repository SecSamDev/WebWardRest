const db = require('../../db/index')
/**
 * ExpressJS controller for creating a new user in the DBs.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.createUser = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && req.user === "") || (req.user && req.user.role && req.user.role < 1)
    ) {
        status = 401;
        data = { message: 'Unauthorized' };
    } else {
        if (req.body !== null && req.body !== undefined && req.body.name && req.body.email) {
            console.log(req.body)
            try {
                let name;
                if(req.body.name && typeof req.body.name ==='string')
                    name = req.body.name;
                else 
                    throw new Error("No valid name")
                let email;
                if(req.body.email && typeof req.body.email ==='string')
                    email = req.body.email;
                else 
                    throw new Error("No valid Email")
                let role;
                if('role' in req.body && typeof req.body.role ==='number')
                    role = req.body.role;
                else 
                    throw new Error("No valid Role")
                let password = await db.hash(name);
                let dbresult = await db.query(`
                    INSERT INTO users 
                    (name,email,password,role,manager,status) 
                    VALUES 
                    ($1,$2,$3,$4,$5,$6)
                `, [name, email,password,role,req.user.id,1]);
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
 * ExpressJS controller for creating a new user in the DBs.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.findUser = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && req.user === "")
    ) {
        res.status(401).send({ message: 'Unauthorized' });
    } else {
        if (req.params !== null && req.params !== undefined && req.params.name && typeof req.params.name === 'string') {
            try {
                let resDB = await db.query('SELECT id,name,email,manager,role,create_date,last_update FROM users WHERE id=$1 AND (manager=$2 OR $3=3)', [req.params.name, req.user.id, req.user.role]);
                if (resDB.rows.length >= 1)
                    res.status(200).jsonp(resDB.rows[0]);
                else
                    throw new Error("Data not found")
            } catch (err) {
                res.status(500).jsonp(err);
            }
        } else {
            try {
                let resDB = await db.query(`
                SELECT 
                    A.id,
                    A.name,
                    A.email,
                    A.manager,
                    A.role,
                    A.create_date,
                    A.last_update,
                    B.name AS manager_name
                FROM users A, users B 
                WHERE 
                    (A.manager=$1 AND A.manager=B.id) 
                    OR ($2=3 AND A.manager=B.id)
                `, [req.user.id, req.user.role]);
                if (resDB.rows.length >= 1)
                    res.status(200).jsonp(resDB.rows);
                else
                    throw new Error("Data not found")
            } catch (err) {
                res.status(500).jsonp(err);
            }
        }
    }
}
/**
 * Update Users
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateUser = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && req.user === "")
    ) {
        status = 401;
        data = { message: 'Unauthorized' };
    } else {
        if (req.params != null && req.params !== undefined && req.params.name && typeof req.params.name === 'string' && req.body !== null && req.body !== undefined) {
            try {
                let dbresult = await db.query(`
                SELECT * FROM users WHERE id=$1 AND (manager=$2 OR $3=3)
                `, [req.params.name, req.user.id,req.user.role]);
                if (dbresult.rows.length === 1) {
                    let email = (req.body.email && typeof req.body.email == 'string') ? req.body.email : dbresult.rows[0].email;
                    let role = (req.body.role && typeof req.body.role === 'string') ? req.body.role : dbresult.rows[0].role;
                    let manager = (req.body.manager && typeof req.body.manager === 'string') ? req.body.manager : null;
                    if(manager){
                        let dbManager = await db.query(`
                        SELECT * FROM users WHERE id=$1
                        `, [manager]);
                        if(dbManager.rows.length === 0)
                            throw new Error("Not valid manager user")
                    }else{
                        manager = dbresult.rows[0].manager;
                    }
                    if (role > req.user.role)
                        throw new Error("Problem with user credentials");
                    let dbSave = await db.query(`
                        UPDATE users 
                        SET email=$2,role=$3,manager=$4
                        WHERE 
                        id=$1 AND (manager=$5 OR $6=3)
                    `, [dbresult.rows[0].id, email, role, manager, req.user.id,req.user.role]);
                    status = 200;
                    data = {};
                } else {
                    throw new Error("Data not found");
                }
            } catch (err) {
                throw new Error(err.toString());
            }
        }
    }
    res.status(status).send(data);
}

exports.deleteUser = async (req, res, next) => {
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
                    let resDB = await db.query(' DELETE FROM users WHERE id=$1 AND (manager=$2 OR $3=3)', [req.params.name,req.user.id,req.user.role]);
                    if (resDB.rowCount >= 1) {
                        status = 200;
                        data = {};
                    }
                    else {
                        throw new Error("Data not found")
                    }

                } catch (err) {
                    data = err;
                }
            }
        }
    }
    res.status(status).send(data);
}
/*
 * User DESIGN:
 * 
 * name : string
 * password : string;
 * email: string;
 * role : number;//Admin, Manager, Visitor
 * create_date : Date;
 * last_update : Date;
 * status : number; //Preactive, active, banned
 * 
 */