const db = require('../db/index')
const request = require('request')
const deployer = require('./deployer')
const path = require('path')
const isInvalidPath = require('../utils/is-invalid-path')

/**
 * Simple object to create complex Kubernetes Objects or Dockers
 */
class InfrastructureFile {
    constructor(name, image) {
        if (!validInfrastructureName(name))
            throw new Error("No valid infraestructure Name")
        if (!validInfrastructureImage(image))
            throw new Error("No valid infraestructure image")
        /**
         * Name of the Kubernetes objects
         */
        this.name = name;
        /**
         * Restart policy
         */
        this.restart = true;
        /**
         * Host entries for this infraestructure in /etc/hosts
         * @type {[{ip : string, hostnames : string[]}]}
         */
        this.hosts = [];
        /**
         * Principal image
         */
        this.image = image;
        /**
         * Memmory requirements
         */
        this.memory = {
            request: "100Mi",
            limit: "200Mi"
        }
        /**
         * Access to processor
         */
        this.processor = {
            request: 0.25,
            limit: 0.5
        }
        /**
         * Ports exposed
         */
        this.ports = []
        /**
         * Replicas of the container
         */
        this.replicas = 1;
        /**
         * Volumes needed.Array of memory the container needs.
         * @type {InfrastructureVolume[]}
         */
        this.volumes = [];
        /**
         * Environmental variables
         */
        this.environment = {};
        /**
         * Use kubernetes from external resource
         * @type {string}
         */
        this.externalKube = null;
        /**
         * Use kubernetes stored in the DB
         * @type {string}
         */
        this.internalKube = null;
        /**
         * The image must be accesed from a private repository
         * @type {InfrastructurePullSecret}
         */
        this.imagePullSecret = null;
    }
    /**
     * Generate a wrapping object that contains all the kubernetes objects.
     */
    async getKubernetesFiles() {
        if (this.internalKube) {
            let resDB = await db.query(`
                SELECT * 
                FROM 
                    kube_object
                WHERE
                    id=$1
            `, [this.internalKube]);
            if (resDB.rowCount < 1)
                throw new Error("Kubernetes File for infraestructure not found")
            return resDB.rows[0];
        } else if (this.externalKube) {
            return new Promise((resolve, reject) => {
                try {
                    request.get(this.externalKube, {}, (err, res) => {
                        if (err)
                            reject(err)
                        else {
                            resolve(res.toJSON().body)
                        }
                    })
                } catch (err) {
                    reject(err)
                }
            })
        } else {
            let kObjects = [];
            kObjects.push(this._getDeployFile());
            kObjects.push(this._getServiceNodePort());
            kObjects.push(this._getServiceDNS());
            if (this.volumes.length > 0)
                kObjects.push(this._getVolumeClaims());
            return {
                "kind" : "List",
                "apiVersion": "v1beta2",
                "items" : kObjects
            }
        }
    }
    _getDeployFile() {
        return {
            apiVersion: "apps/v1",
            kind: "Deployment",
            metadata: {
                name: this.name,
                labels: {
                    app: this.name
                }
            },
            spec: {
                replicas: this.replicas,
                selector: {
                    matchLabels: {
                        app: this.name
                    }
                },
                template: {
                    metadata: {
                        labels: {
                            app: this.name
                        }
                    },
                    spec: {
                        hostname: this.name,
                        imagePullSecret: this.imagePullSecret,
                        containers: [
                            {
                                name: this.name,
                                image: this.image,
                                env: this._getEnvForDeploy(),
                                ports: this._getPortsForDeploy(),
                                volumeMounts: this._getMountPointsForDeploy()
                            }
                        ],
                        volumes: this._getVolumesForDeploy()
                    }
                }
            }
        }
    }
    _getPortsForDeploy() {
        let arr = [];
        for (let i = 0; i < this.ports.length; i++) {
            arr.push({
                containerPort: this.ports[i]
            });
        }
        return arr;
    }
    _getEnvForDeploy() {
        let arr = [];
        let keys = Object.keys(this.environment);
        for (let i = 0; i < keys.length; i++) {
            arr.push({
                name: keys[i],
                value: this.environment[keys[i]]
            });
        }
        return arr;
    }
    _getServiceDNS() {
        return {
            apiVersion: "v1",
            kind: "Service",
            metadata: {
                name: `${this.name}-dns`,
                labels: {
                    app: this.name
                }
            },
            spec: {
                type: "ExternalName",
                externalName: "postgres.webward.com",
                ports: this._getExternalNamePorts(),
                selector: {
                    app: this.name
                }
            }
        }
    }
    _getServiceNodePort() {
        return {
            apiVersion: "v1",
            kind: "Service",
            metadata: {
                name: this.name,
                labels: {
                    app: this.name
                }
            },
            spec: {
                type: "NodePort",
                ports: this._getExternalNamePorts(),
                selector: {
                    app: this.name
                }
            }
        }
    }
    _getExternalNamePorts() {
        let arr = [];
        for (let i = 0; i < this.ports.length; i++) {
            arr.push({
                port: this.ports[i],
                protocol: "TCP",
                targetPort: this.ports[i]
            });
        }
        return arr;
    }
    _getVolumeClaims() {
        let claims = [];
        for (let i = 0; i < this.volumes.length; i++) {
            claims.push({
                apiVersion: "v1",
                kind: "PersistentVolumeClaim",
                metadata: {
                    name: this.name + "-claim-" + i
                },
                spec: {
                    accessModes: this.volumes[i].mode,
                    resources: {
                        requests: {
                            storage: this.volumes[i].size
                        }
                    },
                    selector: {
                        matchLabels: {
                            app: this.name
                        }
                    }
                }
            });
        }
        return claims;
    }
    _getVolumesForDeploy() {
        let vols = [];
        for (let i = 0; i < this.volumes.length; i++) {
            vols.push({
                name: this.name + "-storage-" + i,
                persistentVolumeClaim: {
                    claimName: this.name + "-claim-" + i
                }
            })
        }
        return vols;
    }
    _getMountPointsForDeploy() {
        let vols = [];
        for (let i = 0; i < this.volumes.length; i++) {
            vols.push({
                name: this.name + "-storage-" + i,
                mountPath: this.volumes[i].mountPath
            })
        }
        return vols;
    }
    /**
     * Deploy this infraestructure in kubernetes
     */
    async deployToKubernetes() {
        return await deployer.createKubeObject(await this.getKubernetesFiles());
    }
    /**
     * Deploy this infrastructure in docker system.
     * @param {Docker} client The docker client
     */
    async deployToDocker(client) {
        throw new Error("Not supported")

    }
}
/**
 * Converts a JSON file into infraestructure file
 * @param {InfrastructureFile} data 
 */
function infraestructureFromJSON(data) {
    if (!(data && typeof data.name === 'string' && typeof data.image === 'string'))
        throw new Error("No valid name or image for infraestructure")
    let infr = new InfrastructureFile(data.name, data.image)
    if (data.volumes && data.volumes.length > 0) {
        infr.volumes = parseVolumes(data.volumes);
    }
    if (data.ports && data.ports.length > 0) {
        infr.ports = parsePorts(data.ports);
    }
    if (data.environment) {
        infr.environment = parseEnvironments(data.environment);
    }
    if (data.replicas) {
        try {
            let nu = (new Number(data.replicas)).valueOf()
            if (nu < 0 || nu > 100)
                throw new Error("No valid replica")
            data.replicas = nu;
        } catch (error) {
            data.replicas = 1;
        }
    }
    if (data.memory && typeof data.memory.limit == 'string' && typeof data.memory.request == 'string') {
        infr.memory = data.memory;
    }
    if (data.processor && typeof data.processor.limit == 'number' && typeof data.processor.request == 'number') {
        if (data.processor.limit < 0 || data.processor.limit > 1)
            throw new Error("No valid processor Limit")
        if (data.processor.request < 0 || data.processor.request > 1 || data.processor.request > data.processor.limit)
            throw new Error("No valid processor Request")
        infr.processor = data.processor;
    }
    if (data.imagePullSecret) {
        try {
            infr.imagePullSecret = new InfrastructurePullSecret(data.imagePullSecret.server, data.imagePullSecret.user, data.imagePullSecret.password, data.imagePullSecret.email)
        } catch (err) { }
    }
    return infr;
}
function validInfrastructureName(name) {
    if (!(name && typeof name === 'string' && name.length < 125))
        return false;
    return true;
}

const regexImg = new RegExp("(?:[a-z]+/)?([a-z]+)(?::[0-9]+)?")
/**
 * 
 * @param {string} img 
 */
function validInfrastructureImage(img) {
    if (!(typeof image === 'string' && image.length < 256))
        return false;
    return regexImg.test(img)
}
/**
 * 
 * @param {InfrastructureVolume[]} vols 
 */
function parseVolumes(vols) {
    if (vols && vols.length > 0) {
        let newVols = [];
        for (let i = 0; i < vols.length; i++) {
            try {
                if (!(typeof vols[i].mode === 'string' && (vols[i].mode === 'ReadWriteOnce' || vols[i].mode === 'ReadOnlyMany' || vols[i].mode === 'ReadWriteMany')))
                    throw new Error('0s')
                if (!(typeof vols[i].mountPath === 'string' && !isInvalidPath(vols[i].mountPath)))
                    throw new Error('0s')
                if (!(typeof vols[i].size === 'string'))
                    throw new Error('0s')
                newVols.push(new InfrastructureVolume(vols[i].size, vols[i].mountPath, vols[i].mode));
            } catch (err) { }
        }
        return newVols;
    } else {
        return [];
    }
}

function parsePorts(ports) {
    if (ports && ports.length > 0) {
        let newPorts = [];
        for (let i = 0; i < ports.length; i++) {
            try {
                let port = (new Number(ports[i])).valueOf();
                if (!(port > 0 && port < 65556))
                    throw new Error('No valid port range')
                newPorts.push(port);
            } catch (err) { }
        }
        return newPorts;
    } else {
        return [];
    }
}
function parseEnvironments(envs) {
    let keys = Object.keys(envs);
    let envVars = {};
    for (let key of keys) {
        if (typeof envs[key] === 'string') {
            envVars[key] = envs[key];
        }
    }
    return envVars;

}

class InfrastructureVolume {
    /**
     * 
     * @param {string} size Size of the Volume
     * @param {string} mountPath Mount path for the volume
     * @param {string} mode Access mode for the volume
     */
    constructor(size, mountPath, mode) {
        this.mode = mode;
        this.size = size;
        if (isInvalidPath(mountPath))
            throw new Error("Not valid path for Volume Infrastructure")
        this.mountPath = mountPath;
    }
}
class InfrastructurePullSecret {
    /**
     * 
     * @param {string} server 
     * @param {string} user 
     * @param {string} password 
     * @param {string} email 
     */
    constructor(server, user, password, email) {
        this.server = server;
        this.user = user;
        this.password = password;
        this.email = email;
    }
    getSecretFile() {
        return {
            "apiVersion": "v1",
            "kind": "Secret",
            "metadata": {
                "name": "PullSecret-" + this.server + "-" + this.user
            },
            "type": "kubernetes.io/dockerconfigjson",
            "data": {
                ".dockerconfigjson": this.encodeJSON()
            }
        }
    }
    encodeJSON() {
        let authObj = {
            "auths": {
            }
        }
        authObj.auths["" + this.server] = {
            "username": this.user,
            "password": this.password,
            "email": this.email,
            "auth": Buffer.from(this.user + ":" + this.password).toString('base64')
        }
        return Buffer.from(JSON.stringify(authObj)).toString('base64');
    }

}


exports.InfrastructureFile = InfrastructureFile;
exports.InfrastructureVolume = InfrastructureVolume;