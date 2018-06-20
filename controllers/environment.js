/**
 * ExpressJS controller for creating a new environment
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.createEnvironment = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && req.user === "")
    ) {
        res.status(401).send({ message: 'Unauthorized' });
    } else {
        if (req.body !== null && req.body !== undefined) {
            if (req.body.name && typeof req.body.name == 'string'
                && req.body.description && typeof req.body.description == 'string'
            ) {
                let active = req.body.active || true;

            } else {
                res.status(500).send({ message: 'Data not valid' });
            }
        } else {
            res.status(500).send({ message: 'Data not valid' });
        }
    }

}
/**
 * ExpressJS controller for update environment.
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.updateEnvironment = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && req.user === "")
    ) {
        res.status(401).send({ message: 'Unauthorized' });
    } else {
        if (req.body !== null && req.body !== undefined) {
            if (req.body.name && typeof req.body.name == 'string'
                && req.body.description && typeof req.body.description == 'string'
            ) {
                let active = req.body.active || true;

            } else {
                res.status(500).send({ message: 'Data not valid' });
            }
        } else {
            res.status(500).send({ message: 'Data not valid' });
        }
    }

}
/**
 * ExpressJS controller for finding environments
 * @param {} req 
 * @param {} res 
 * @param {function} next 
 */
exports.findEnvironment = async (req, res, next) => {
    if (!req.user || req.user === null || req.user === undefined
        || (req.user && req.user === "")
    ) {
        res.status(401).send({ message: 'Unauthorized' });
    } else {
        if (req.params !== null && req.params !== undefined) {
            if (req.params.name && typeof req.params.name === 'string') {
                res.status(200).jsonp({
                    id: 0,
                    name: req.params.name,
                    description: "Desc: - - - " + req.params.name,
                    environments: [],
                    active: true
                });
            } else {
                res.status(200).jsonp([
                    {
                        id: 0,
                        name: req.params.name,
                        description: "Desc: - - - " + req.params.name,
                        environments: [],
                        active: true
                    },
                    {
                        id: 1,
                        name: req.params.name + 2,
                        description: "Desc: - - - " + req.params.name + 2,
                        environments: [],
                        active: false
                    }
                ]);
            }
        } else {
            res.status(500).send({ message: 'Data not valid' });
        }
    }

}
