const { deployDBIfNecessary } = require('./deploy-db');
const { checkIfArachniIsDeployed } = require('./deploy-arachni');

const fs = require('fs');
const { URL } = require('url')
const child_process = require('child_process');
const os = require('os');
const environmentDetector = require('./detectENV')
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config;
const deployer = require('./deployer')
var Docker = require('dockerode');

/**
 * Checks Infraestructure Environment
 * Deploys DB if necessary.
 */
async function init(debug = true) {
    //First Detect our environment
    environmentDetector.init(debug);
    //
    if (process.kubernetes) {
        try {
            const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });
            process.kube_client = client;
        } catch (err) {
            const client = new Client({ config: config.getInCluster(), version: '1.9' });
            process.kube_client = client;
        }

    } else if (process.docker) {
        const client = new Docker({ socketPath: '/var/run/docker.sock' });
        process.docker_client = client;
    } else if (process.bare_metal) {
        if (process.docker_access) {

        } else if (process.minikube_access) {
            const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });
            process.kube_client = client;
        } else if (process.kubectl_access) {
            const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });
            process.kube_client = client;
        }
    }
    try{
        await deployDBIfNecessary(debug); 
    }catch(err){}
    
    if(debug)
        console.log(`Postgres DB running on <${process.env.PGHOST}:${process.env.PGPORT}>...`)
    checkIfArachniIsDeployed(debug).then(()=>{
        if(debug)
            console.log(`Arachni working`)
    }).catch(err=>{})
}

exports.init = init;