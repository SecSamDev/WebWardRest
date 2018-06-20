const { URL } = require('url')
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config;

/**
 * Creates a new deployment using kubernetes
 * @param {} client 
 * @param {} deploy 
 */
async function createKubeDeploy(client, deploy) {
    return await client.apis.apps.v1.namespaces(namespace()).deployments.post({ body: deploy })
}
/**
 * Updates a deployment using kubernetes
 * @param {} client 
 * @param {} deploy 
 */
async function updateKubeDeploy(client, deploy) {
    return await client.apis.apps.v1.namespaces(namespace()).deployments(deploy.metadata.name).patch({ body: deploy })
}
/**
 * Do a PUT with the deployment
 * @param {} client 
 * @param {} service 
 */
async function exchangeKubeDeploy(client, deploy) {
    await deleteKubeDeploy(client, deploy)
        return await createKubeDeploy(client, deploy)
}
/**
 * Deletes a deployment using kubernetes
 * @param {} client 
 * @param {} deploy 
 */
async function deleteKubeDeploy(client, deploy) {
    return await client.apis.apps.v1.namespaces(namespace()).deployments(deploy.metadata.name).delete()
}

/**
 * Searchs for a kubernetes Deployment
 * @param {} client 
 * @param {} deployName 
 */
async function searchKubeDeploy(client, deployName) {
    return (await client.apis.apps.v1.namespaces(namespace()).deployments(deployName).get()).body
}
/**
 * Search for a new kubernetes Service
 * @param {} client 
 * @param {} serviceName 
 */
async function searchKubeService(client, serviceName) {
    return (await client.api.v1.namespaces(namespace()).services(serviceName).get()).body
}

/**
 * Creates a new Kubernetes Service
 * @param {} client 
 * @param {} service 
 */
async function createKubeService(client, service) {
    return await client.api.v1.namespaces(namespace()).services.post({ body: service })
}
/**
 * Deletes a service using kubernetes
 * @param {} client 
 * @param {} deploy 
 */
async function deleteKubeService(client, service) {
    return await client.api.v1.namespaces(namespace()).services(service.metadata.name).delete()
}

/**
 * Update the service
 * @param {} client 
 * @param {} service 
 */
async function updateKubeService(client, service) {
    return await client.api.v1.namespaces(namespace()).services(service.metadata.name).patch({ body: service })
}
/**
 * Do a PUT with the service
 * @param {} client 
 * @param {} service 
 */
async function exchangeKubeService(client, service) {
    await client.api.v1.namespaces(namespace()).services(service.metadata.name).delete()
    return await client.api.v1.namespaces(namespace()).services.post({ body: service })
}

/**
 * Abstract the logic to get the connection information
 * @param {} ser 
 * @param {number} port 
 * @param {string} portName 
 */
function extractConnectionInformation(ser, port, portName) {
    if (process.kubernetes && process.kube_client) {
        return connectionForKubernetes(ser, port, portName);
    } else if (process.docker && process.docker_client) {
        throw new Error("Not supported")
    } else if (process.bare_metal && process.minikube_access) {
        return connectionForMinikube(ser, port, portName);
    } else {
        throw new Error("No valid deployment system")
    }

}
/**
 * Extracts the connection information of a service. 
 * The Ip is obtained from the kubernetes configuration because we need to connect to a host.
 * 
 * If Service=ClusterIP, then we extract the port from ports[0].port
 * 
 * If Service=NodePort then nodePort is extracted
 * 
 * @param {*} ser Kubernetes Service Object
 * @param {number} port Port Number to search
 * @param {string} portName If multiple port get the alias
 */
function connectionForMinikube(ser, port, portName) {
    if (ser.spec && ser.spec.ports && ser.spec.ports.length > 0) {
        let url = new URL(config.fromKubeconfig().url).hostname.toString();
        if (ser.spec && ser.spec.type === 'ClusterIP') {
            let clustPort = ser.spec.ports.map((val, i, arr) => {
                if (val.name === portName || val.targetPort == port)
                    return val.port;
            });
            if (clustPort.length === 0) {
                clustPort = ser.spec.ports.map((val, i, arr) => {
                    return val.port;
                });
            }
            return {
                url: url,
                port: clustPort[0]
            }
        } else if (ser.spec && ser.spec.type === 'NodePort') {
            let nodePort = ser.spec.ports.map((val, i, arr) => {
                if (val.nodePort)
                    return val.nodePort;
            });
            return {
                url: url,
                port: nodePort[0]
            }
        } else {
            throw new Error("No valid service information")
        }
    } else {
        throw new Error("No valid service information")
    }
}

function connectionForDocker(ser) {
    //TODO: SUPPORT FOR DOCKER
}
/**
 * Extracts the connection information of a service. 
 * 
 * If Service=ClusterIP, then we extract the port from ports[0].port and the IP from spec.clusterIP
 * 
 * If Service=NodePort then nodePort is extracted and spec.IP
 * 
 * @param {*} ser Kubernetes Service Object
 * @param {number} port Port Number to search
 * @param {string} portName If multiple port get the alias
 */
function connectionForKubernetes(ser, port, portName) {
    if (ser.spec && ser.spec.ports && ser.spec.ports.length > 0) {
        if (ser.spec && ser.spec.type === 'ClusterIP') {
            let clustPort = ser.spec.ports.map((val, i, arr) => {
                if (val.name === portName || val.targetPort == port)
                    return val.port;
            });
            if (clustPort.length === 0) {
                clustPort = ser.spec.ports.map((val, i, arr) => {
                    return val.port;
                });
            }
            return {
                url: ser.spec.clusterIP,
                port: clustPort[0]
            }
        } else if (ser.spec && ser.spec.type === 'NodePort') {
            let nodePort = ser.spec.ports.map((val, i, arr) => {
                if (val.nodePort)
                    return val.nodePort;
            });
            return {
                url: ser.spec.IP,
                port: nodePort[0]
            }
        } else {
            throw new Error("No valid service information")
        }
    } else {
        throw new Error("Cant connect to ARACHNI GRID. Reason: No valid service found")
    }

}

/**
 * Get current namespace
 */
function namespace() {
    return 'kube_namespace' in process.env ? process.env.kube_namespace : 'default';
}
/**
 * Compare if two services are the same. Coompares service type and metadata
 * @param {} ser1 
 * @param {} ser2 
 */
function isSameService(ser1, ser2) {
    if (ser1.spec.type === ser2.spec.type) {
        return true;
    }
    return false;
}

exports.isSameService = isSameService;
exports.namespace = namespace;

exports.connectionForKubernetes = connectionForKubernetes;
exports.connectionForMinikube = connectionForMinikube;
exports.extractConnectionInformation = extractConnectionInformation;

//Services
exports.searchKubeService = searchKubeService;
exports.createKubeService = createKubeService;
exports.updateKubeService = updateKubeService;
exports.exchangeKubeService = exchangeKubeService;
exports.deleteKubeService  =deleteKubeService;

//Deployments
exports.searchKubeDeploy = searchKubeDeploy;
exports.createKubeDeploy = createKubeDeploy;
exports.deleteKubeDeploy = deleteKubeDeploy;
exports.updateKubeDeploy = updateKubeDeploy;
exports.exchangeKubeDeploy = exchangeKubeDeploy;

//Docker TODO: 
exports.connectionForDocker = connectionForDocker;