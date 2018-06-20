const jwt = require('jsonwebtoken');
const db = require('../db/index')
/**
 * ExpressJS controller for authenticate users.
 * The credentials must be sended in req.body.username and req.body.password
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.authenticateUser = async (req, res, next) => {
    let status = 401;
    let data = { message: 'Not valid username' };
    if (req.body !== null && req.body !== undefined) {
        if (req.body.username && typeof req.body.username == 'string' && req.body.password && typeof req.body.password == 'string') {
            //process.env.JWT_SECRET
            let expire = (req.body.remember && typeof req.remember === 'boolean' && req.body.remember === true) ? 604800 : 10800;
            req.body.password = await db.hash(req.body.password);
            try {
                let resDB = await db.query(`SELECT * FROM users WHERE name=$1 AND password=$2;`, [req.body.username, req.body.password]);

                if (resDB.rows.length >= 1) {
                    let userDB = resDB.rows[0];
                    if (userDB.status === 1) {
                        try {
                            let token = await JWT_SIGN(
                                {
                                    'id': userDB.id,
                                    'username': userDB.name,
                                    'role': userDB.role
                                }, process.env.JWT_SECRET || 'secret',
                                { algorithm: 'HS256', expiresIn: expire }
                            );
                            data = {
                                'token': token,
                                user: {
                                    'name': userDB.name,
                                    'id' : userDB.id,
                                    'role' : userDB.role
                                }
                            };
                            status = 200;
                            await db.query(`UPDATE users SET last_update=current_timestamp WHERE id=$1`, [userDB.id]);
                        } catch (err) {}
                    }
                }
            } catch (err) {}
        }
    }
    res.status(status).jsonp(data);
    next();
}

/**
 * Route controller for checking if the user is authenticated
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.isAuthenticated = async (req, res, next) => {
    const status = 401;
    const data = { 'error': 'Unauthenticated' };
    let authHead = req.headers.authorization.split(" ");
    if (authHead.length == 2) {
        var authType = authHead[0];
        var token = authHead[1];
        if (!token) {
            req.user = false;
        } else {
            try {
                const decoded = await JWT_VERIFY(token, process.env.JWT_SECRET || 'secret', { algorithms: 'HS256' });
                status = 200;
                data = { 'user': decoded };
            } catch (err) { }
        }
    }
    res.status(status).jsonp(data);
    next();
}
/**
 * Middleware for checking if a token is valid
 */
exports.loginUser = async (req, res, next) => {
    let authHead;
    if (req.headers.authorization && (authHead = req.headers.authorization.split(" ")).length == 2) {
        var authType = authHead[0];
        var token = authHead[1];
        if (!token) {
            req.user = false;
            next();
        } else {
            try {
                const decoded = await JWT_VERIFY(token, process.env.JWT_SECRET || 'secret', { algorithms: 'HS256' });
                req.user = decoded;
                next();
            } catch (err) {
                req.user = false;
                next();
            }
        }
    } else {
        req.user = false;
        next();
    }

}

/**
 * Simple JWT.sign() wrapper to use in async format
 * @param {} payload 
 * @param {string} secret 
 * @param {} options 
 */
async function JWT_VERIFY(token, secret, options) {
    return new Promise((fulfill, reject) => {
        jwt.verify(token, secret, options, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                fulfill(decoded);
            }
        });
    });
}

/**
 * Simple JWT.sign() wrapper to use in async format
 * @param {} payload 
 * @param {string} secret 
 * @param {} options 
 */
async function JWT_SIGN(payload, secret, options) {
    return new Promise((fulfill, reject) => {
        jwt.sign(
            payload, secret, options, (err, token) => {
                if (err) reject(err);
                else
                    fulfill(token);
            });
    });
}
/**
 * Middleware for launching error of authentication
 */
exports.needAuth = function (minRole) {
    return async (req, res, next) => {
        if (req.user && req.user !== false && 'role' in req.user && req.user.role >= minRole) {
            next();
        } else {
            res.status(401).jsonp({ message: 'Unauthorized' });
        }
    }
}
