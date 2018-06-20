const { InfrastructureFile } = require('./deploy-file')
const request = require('request')
const Client = require('kubernetes-client').Client
var Docker = require('dockerode');
const {
    isSameService, namespace, createKubeService,
    createKubeDeploy, connectionForMinikube,
    connectionForKubernetes, connectionForDocker,
    extractConnectionInformation, searchKubeDeploy,
    searchKubeService, updateKubeService,
    exchangeKubeService, exchangeKubeDeploy,
    updateKubeDeploy, deleteKubeDeploy, deleteKubeService
} = require('./utils')



async function createObject(deployFile) {
    if ((process.kubernetes && process.kube_client) || (process.bare_metal && process.minikube_access)) {
        return await createKubeObject(deployFile)
    } else if (process.docker && process.docker_client) {
        return await createDockerObject(deployFile)
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}
async function deleteObject(deployFile) {
    if ((process.kubernetes && process.kube_client) || (process.bare_metal && process.minikube_access)) {
        return await deleteKubeObject(deployFile)
    } else if (process.docker && process.docker_client) {
        //return await createDockerObject(deployFile)
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}
async function exchangeObject(deployFile) {
    if ((process.kubernetes && process.kube_client) || (process.bare_metal && process.minikube_access)) {
        return await exchangeKubeObject(deployFile)
    } else if (process.docker && process.docker_client) {
        //return await createDockerObject(deployFile)
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}
async function updateObject(deployFile) {
    if ((process.kubernetes && process.kube_client) || (process.bare_metal && process.minikube_access)) {
        return await updateKubeObject(deployFile,process.kube_client)
    } else if (process.docker && process.docker_client) {
        //return await createDockerObject(deployFile)
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}
async function findObject(deployFile) {
    if ((process.kubernetes && process.kube_client) || (process.bare_metal && process.minikube_access)) {
        return await searchKubeObject(deployFile)
    } else if (process.docker && process.docker_client) {
        //return await createDockerObject(deployFile)
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}
async function findObjects(kind) {
    if ((process.kubernetes && process.kube_client) || (process.bare_metal && process.minikube_access)) {
        return await searchKubeObjects(kind,process.kube_client)
    } else if (process.docker && process.docker_client) {
        //return await createDockerObject(kind)
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}





async function createDockerObject(dockDep) {
    if (object.kind && object.metadata && object.metadata.name) {
        throw new Error("In construction")
        /**
        * @type {Docker}
        */
        let client = process.docker_client;
        switch (object.kind) {
            case 'Deployment':
                let replicas = (object.spec && object.spec.replicas ? object.spec.replicas : 1);
                if (!(object.spec && object.spec.template && object.spec.template.spec && object.spec.template.spec.containers))
                    throw new Error("No valid containers")
                let containers = object.spec.template.spec.containers;
                for (let i = 0; i < replicas; i++) {
                    try {
                        let runPromises = [];
                        for (let j = 0; j < containers.length; j++) {
                            runPromises.push(client.run(containers[j].image, [], process.stdout, {
                                'Volumes': [],
                                'ExposedPorts': containers[j].ports,
                                'Hostconfig': []
                            }));
                        }
                    } catch (err) { }
                }
            case 'Service':
                return (await client.api.v1.namespaces(namespace()).services(object.metadata.name).get()).body
            default:
                throw new Error("Not supported kind")

        }
    } else {
        throw new Error("Not valid kind")
    }
}

async function deployFromDocker(dockDepl) {
    /**
    * @type {Docker}
    */
    let client = process.docker_client;
    let runPromises = [];
    for (let i = 0; i < dockDepl.replicas; i++) {
        runPromises.push(client.run(dockDepl.image, dockDepl.cmd, process.stdout, {
            'Volumes': dockDepl.volumes,
            'ExposedPorts': dockDepl.ports,
            'Hostconfig': dockDepl.host
        }));
    }
    //Parallel creation of containers
    await Promise.all(runPromises);
}


async function searchKubeObject(object,client = process.kube_client) {
    if (object.kind && object.metadata && object.metadata.name) {
        switch (object.kind) {
            case 'Deployment':
                return (await client.apis.apps.v1.namespaces(namespace()).deployments(object.metadata.name).get()).body
            case 'Service':
                return (await client.api.v1.namespaces(namespace()).services(object.metadata.name).get()).body
            default:
                throw new Error("Not supported kind")

        }
    } else {
        throw new Error("Not valid kind")
    }
}
async function searchKubeObjects(kind,client = process.kube_client) {
    switch (kind) {
        case 'Deployment':
            return processKubeResponse((await client.apis.apps.v1.namespaces(namespace()).deployments.get()).body)
        case 'Service':
            return processKubeResponse((await client.api.v1.namespaces(namespace()).services.get()).body)
        default: W
            throw new Error("Not supported kind")

    }
}

async function deleteKubeObject(object, client = process.kube_client) {
    if (object.kind) {
        switch (object.kind) {
            case 'Deployment':
                return await deleteKubeDeploy(client, object);
            case 'Service':
                return await deleteKubeService(client, object)
            case 'List':
                if (object.items) {
                    let proms = [];
                    for (let i = 0; i < object.items.length; i++) {
                        proms.push(deleteKubeObject(object.items[i]), client)
                    }
                    return await Promise.all(proms)
                }
                else
                    throw new Error("No items in the list")
            default:
                throw new Error("Not supported kind")

        }
    } else {
        throw new Error("Not valid kind")
    }
}

async function createKubeObject(object, client = process.kube_client) {
    if (object.kind) {
        switch (object.kind) {
            case 'Deployment':
                return await createKubeDeploy(client, object);
            case 'Service':
                return await createKubeService(client, object)
            case 'List':
                if (object.items) {
                    let proms = [];
                    for (let i = 0; i < object.items.length; i++) {
                        proms.push(createKubeObject(object.items[i]), client)
                    }
                    return await Promise.all(proms)
                }
                else
                    throw new Error("No items in the list")
            default:
                throw new Error("Not supported kind")

        }
    } else {
        throw new Error("Not valid kind")
    }
}

async function updateKubeObject(object, client = process.kube_client) {
    if (object.kind) {
        switch (object.kind) {
            case 'Deployment':
                return await updateKubeDeploy(client, object);
            case 'Service':
                return await updateKubeService(client, object)
            case 'List':
                if (object.items) {
                    let proms = [];
                    for (let i = 0; i < object.items.length; i++) {
                        proms.push(updateKubeObject(object.items[i]), client)
                    }
                    return await Promise.all(proms)
                }
                else
                    throw new Error("No items in the list")
            default:
                throw new Error("Not supported kind")

        }
    } else {
        throw new Error("Not valid kind")
    }
}
//TODO: set clients
async function exchangeKubeObject(object,client = process.kube_client) {
    if (object.kind) {
        switch (object.kind) {
            case 'Deployment':
                return await exchangeKubeDeploy(client, object);
            case 'Service':
                return await exchangeKubeService(client, object)
            case 'List':
                if (object.items) {
                    let proms = [];
                    for (let i = 0; i < object.items.length; i++) {
                        proms.push(exchangeKubeObject(object.items[i]), client)
                    }
                    return await Promise.all(proms)
                }
                else
                    throw new Error("No items in the list")
            default:
                throw new Error("Not supported kind")

        }
    } else {
        throw new Error("Not valid kind")
    }
}

/**
 * Process the response from the server. Normally the Kubernetes API reply with
 *  DeploymentList or ServiceList and we only want the items.
 * @param {} resp 
 */
function processKubeResponse(resp) {
    if (resp.kind === 'DeploymentList') {
        return resp.items.map((val, i, arr) => {
            val["apiVersion"] = "apps/v1";
            val["kind"] = "Deployment";
            return val;
        });
    } else if (resp.kind === 'ServiceList') {
        return resp.items.map((val, i, arr) => {
            val["apiVersion"] = "v1";
            val["kind"] = "Service";
            return val;
        });
    } else {
        return resp;
    }
}

//Kubernetes ONLY
exports.searchKubeObjects = searchKubeObjects;
exports.searchKubeObject = searchKubeObject;
exports.createKubeObject = createKubeObject;
exports.deleteKubeObject = deleteKubeObject;
exports.updateKubeObject = updateKubeObject;
exports.exchangeKubeObject = exchangeKubeObject;


//All SYSTEMS ONLY
exports.searchObjects = findObjects;
exports.searchObject = findObject;
exports.createObject = createObject;
exports.deleteObject = deleteObject;
exports.updateObject = updateObject;
exports.exchangeObject = exchangeObject;
