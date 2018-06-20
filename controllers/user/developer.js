const db = require('../../db/index')
/**
 * ExpressJS controller for creating a new user in the DBs.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.createUser = async (req, res, next) => {
    res.status(401).send({'message' : 'Unauthorized'});
}

/**
 * ExpressJS controller for creating a new user in the DBs.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.findUser = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.params !== null && req.params !== undefined 
        && req.params.name && typeof req.params.name === 'string'
        && req.params.name === req.user.id) {
        try {
            let resDB = await db.query(`
            SELECT 
                id,
                name,
                email,
                manager,
                role,
                create_date,
                last_update 
            FROM
                users 
            WHERE 
                id=$1 
            `, [req.user.id]);
            if (resDB.rows.length >= 1) {
                status = 200;
                data = resDB.rows[0];
            }
            else
                throw new Error("Data not found")
        } catch (err) {
            data = { message: err !== null ? err.toString() : 'Data not valid' };
        }
    }else{
        status = 401;
        data = {'message' : 'Unauthorized'};
    }
    res.status(status).send(data);
}
/**
 * ExpressJS controller for creating a new user in the DBs.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.findUsers = async (req, res, next) => {
    res.status(401).send({'message' : 'Unauthorized'});
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
    if (req.params != null && req.params !== undefined 
        && req.params.name && typeof req.params.name === 'string' 
        && req.params.name === req.user.id
        && req.body !== null && req.body !== undefined) {
        try {
            let dbresult = await db.query(`
            SELECT 
                * 
            FROM 
                users 
            WHERE 
                id=$1
            `, [req.user.id]);
            if (dbresult.rows.length === 1) {
                let email = (req.body.email && typeof req.body.email == 'string') ? req.body.email : dbresult.rows[0].email;
                let password = (req.body.password && typeof req.body.password === 'string' && req.body.password.length > 3) ? await db.hash(req.body.password) : dbresult.rows[0].password;
                if (role > req.user.role)
                    throw new Error("Problem with user credentials");
                let dbSave = await db.query(`
                    UPDATE users 
                    SET email=$2,password=$3
                    WHERE 
                    id=$1
                `, [dbresult.rows[0].id, email,password]);
                status = 200;
                data = {};
            } else {
                throw new Error("Data not found");
            }
        } catch (err) {
            throw new Error(err.toString());
        }
    }
    res.status(status).send(data);
}

exports.deleteUser = async (req, res, next) => {
    res.status(401).send({'message' : 'Unauthorized'});
}
