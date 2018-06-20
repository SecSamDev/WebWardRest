const { InfrastructureFile, InfrastructureVolume } = require('./deploy-file')
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


/**
 * 
 * @param {InfrastructureFile} deployFile 
 */
async function deployInfrastructure(deployFile) {
    if ((process.kubernetes && process.kube_client) || (process.bare_metal && process.minikube_access)) {
        return await createKubeObject(await deployFile.getKubernetesFiles())
    } else if (process.docker && process.docker_client) {
        throw new Error('Docker not supported yet')//TODO:
        //return await createDockerObject(deployFile.deployToDocker)
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}

/**
 * 
 * @param {InfrastructureFile} deployFile 
 */
async function deleteInfrastructure(deployFile) {
    if ((process.kubernetes && process.kube_client) || (process.bare_metal && process.minikube_access)) {
        return await deleteKubeObject(deployFile.getKubernetesFiles())
    } else if (process.docker && process.docker_client) {
        //return await createDockerObject(deployFile)
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}

/**
 * 
 * @param {InfrastructureFile} deployFile 
 */
async function updateInfrastructure(deployFile) {
    if ((process.kubernetes && process.kube_client) || (process.bare_metal && process.minikube_access)) {
        return await updateKubeObject(deployFile.getKubernetesFiles())
    } else if (process.docker && process.docker_client) {
        //return await createDockerObject(deployFile)
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}
/**
 * 
 * @param {string} deployFile 
 */
async function findInfrastructure(deployFile) {
    if ((process.kubernetes && process.kube_client) || (process.bare_metal && process.minikube_access)) {
        return await searchKubeObject(deployFile)
    } else if (process.docker && process.docker_client) {
        //return await createDockerObject(deployFile)
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}
/**
 * 
 * @param {string} deployFile 
 */
async function findInfrastructures(deployFile) {
    if ((process.kubernetes && process.kube_client) || (process.bare_metal && process.minikube_access)) {
        return await searchKubeObjects(deployFile)
    } else if (process.docker && process.docker_client) {
        //return await createDockerObject(deployFile)
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}





//Flexible Infrastructure system
exports.deployInfrastructure = deployInfrastructure;
exports.deleteInfrastructure = deleteInfrastructure;
exports.updateInfrastructure = updateInfrastructure;
exports.findInfrastructure = findInfrastructure;
exports.findInfrastructures = findInfrastructures;
