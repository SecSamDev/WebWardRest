const db = require('../../db/index')
/**
 * ExpressJS controller for creating a new webProject
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.createWebProject = async (req, res, next) => {
    res.status(401).jsonp({ 'error': 'Unauthorized' })
}
/**
 * ExpressJS controller for update web projects.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.updateWebProject = async (req, res, next) => {
    res.status(401).jsonp({ 'error': 'Unauthorized' })
}
/**
 * ExpressJS controller for deleting web projects.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.deleteWebProject = async (req, res, next) => {
    res.status(401).jsonp({ 'error': 'Unauthorized' })
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
    if (req.params !== null && req.params !== undefined) {
        if (req.params.name && typeof req.params.name === 'string') {
            try {
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
                    web_projects.id=$1 AND
                    ($2 ANY web_projects.developers)
                `, [req.params.name,req.user.id]);
                if (resDB.rows.length >= 1) {
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
/**
 * Find all the web projects for a developer
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findWebProjects = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    try {
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
                ($1 ANY web_projects.developers)
            `, [req.user.id]);
        if (resDB.rows.length >= 1) {
            status = 200;
            data = resDB.rows;
        }
        else
            throw new Error("Data not found")
    } catch (err) { }
    res.status(status).send(data);
}