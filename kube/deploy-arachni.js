const { URL } = require('url')
const {
    isSameService, namespace, createKubeService,
    createKubeDeploy, connectionForMinikube,
    connectionForKubernetes, connectionForDocker,
    extractConnectionInformation, searchKubeDeploy,
    searchKubeService, updateKubeService, exchangeKubeService
} = require('./utils')
const util = require('util')
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config;
var Docker = require('dockerode');
const { ArachniAPI } = require('../ww_libraries/arachni/arachni-REST')

/**
 * A REST API node will detect if there are Arachni Nodes.
 * If not then it will deploy a new one.
 */
async function deployArachniIfNecessary() {
    if (process.kubernetes && process.kube_client) {
        let client = process.kube_client;
        await tryToDeployKubernetes(client, arachniDeploy, arachniService2);
    } else if (process.docker && process.docker_client) {

    } else if (process.bare_metal && process.minikube_access) {
        if (!('ARACHNI_URL' in process.env && 'ARACHNI_PORT' in process.env))
            throw new Error("ARACHNI not available. Reason: Imposible to forward ports from host to kubernets Network")
        let client = process.kube_client;
        await tryToDeployKubernetes(client, arachniDeploy, arachniService);
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}

async function tryToDeployKubernetes(client, kubeDep, kubeSer) {
    try {
        await checkArachni(process.env.ARACHNI_URL, process.env.ARACHNI_PORT);
    } catch (err) {
        //We cant access ARACHNI
        console.log("ARACHNI GRID not running. Trying to deploy a new one...")
        try {
            let dep
            try {
                dep = await searchKubeDeploy(client, kubeDep.metadata.name);
            } catch (err) { }

            if (!dep) {
                await createKubeDeploy(client, kubeDep);
                dep = await searchKubeDeploy(client, kubeDep.metadata.name);
            }
            //We have found the deployment
            try {
                let ser = await searchKubeService(client, kubeSer.metadata.name);
                if (!ser) {
                    await createKubeService(client, kubeSer);
                } else if (!isSameService(ser, kubeSer)) {
                    ser = (await updateKubeService(client, kubeSer)).body;
                }
                let connInfo = extractConnectionInformation(ser, 7331, 'grid')
                await checkArachni(connInfo.url, connInfo.port)
                process.env.ARACHNI_URL = connInfo.url;
                process.env.ARACHNI_PORT = connInfo.port;
            } catch (err2) {
                //No service then create it
                throw new Error("Cant deploy ARACHNI GRID, Reason: error with Service")
            }
        } catch (err2) {
            throw err2
        }
    }
}
async function checkIfArachniIsDeployed(debug = true, client = process.kube_client) {
    try {
        await checkArachni(process.env.ARACHNI_URL, process.env.ARACHNI_PORT, debug);
        console.log("ARACHNI: " + process.env.ARACHNI_URL + " " + process.env.ARACHNI_PORT)
    } catch (err) {
        //We cant access ARACHNI
        try {
            let timeout = new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject("Timeout exceded");
                }, 5000)
            })
            let ser = await Promise.race([searchKubeService(client, arachniService.metadata.name), timeout])
            if (!ser) {
                await createKubeService(client, arachniService);
            } else if (!isSameService(ser, arachniService)) {
                ser = (await exchangeKubeService(client, arachniService)).body;
            }
            let connInfo = extractConnectionInformation(ser, 7331, 'grid')
            //await checkArachni(connInfo.url, connInfo.port, debug)
            process.env.ARACHNI_URL = connInfo.url;
            process.env.ARACHNI_PORT = connInfo.port;
            console.log("ARACHNI: " + process.env.ARACHNI_URL + " " + process.env.ARACHNI_PORT)
        } catch (err2) {
            throw err2
        }
    }
}

/**
 * Simple function that "pings" using a TCP socket to ARACHNI server.
 */
async function checkArachni(arachURL, port, debug = true) {
    if (debug)
        console.log("Trying ARACHNI on " + arachURL + ":" + port)
    /**
     * @type {ArachniAPI}
     */
    var arach;
    try {
        try{
            new URL(arachURL)
            arach = new ArachniAPI(arachURL);
        }catch(err){
            arach = new ArachniAPI("http://" + arachURL + ":" + port);
        }
        let pingArch = util.promisify(arach.pingArachni)
        let promTime = new Promise((res, rej) => {
            setTimeout(rej, 10000, 'Timeout exceded');
        })
        //DEBUG purposes
        let aaa = await Promise.race([(pingArch.bind(arach))(), promTime])
    } catch (err) {
        if (debug)
            console.log(err)
        try {
            await arch.exit()
        } catch (err2) { }
        throw err;
    }

}


const arachniDeploy = {
    "apiVersion": "apps/v1",
    "kind": "Deployment",
    "metadata": {
        "name": "ww-arachni",
        "labels": {
            "app": "ww-arachni"
        }
    },
    "spec": {
        "replicas": 1,
        "selector": {
            "matchLabels": {
                "app": "ww-arachni"
            }
        },
        "template": {
            "metadata": {
                "labels": {
                    "app": "ww-arachni"
                }
            },
            "spec": {
                "containers": [
                    {
                        "name": "ww-arachni",
                        "image": "secsamdev/ww-arachni",
                        "ports": [{
                            "containerPort": 7331
                        }, {
                            "containerPort": 22
                        }],
                        "imagePullPolicy": "Always"
                    }
                ]
            }
        }
    }
}
const arachniService = {
    "apiVersion": "v1",
    "kind": "Service",
    "metadata": {
        "name": "ww-arachni"
    },
    "spec": {
        "type": "ClusterIP",
        "ports": [
            {
                "name": "grid",
                "port": 7331,
                "protocol": "TCP",
                "targetPort": 7331
            },
            {
                "name": "ssh",
                "port": 22,
                "protocol": "TCP",
                "targetPort": 22
            },
            {
                "name": "grid2",
                "port": 9292,
                "protocol": "TCP",
                "targetPort": 9292
            }
        ],
        "selector": {
            "app": "ww-arachni"
        }
    }
}
const arachniService2 = {
    "apiVersion": "v1",
    "kind": "Service",
    "metadata": {
        "name": "ww-arachni"
    },
    "spec": {
        "type": "NodePort",
        "ports": [
            {
                "name": "grid",
                "port": 7331,
                "protocol": "TCP",
                "targetPort": 7331
            },
            {
                "name": "ssh",
                "port": 22,
                "protocol": "TCP",
                "targetPort": 22
            },
            {
                "name": "grid2",
                "port": 9292,
                "protocol": "TCP",
                "targetPort": 9292
            }
        ],
        "selector": {
            "app": "ww-arachni"
        }
    }
}
exports.deployArachniIfNecessary = deployArachniIfNecessary;
exports.checkIfArachniIsDeployed = checkIfArachniIsDeployed;