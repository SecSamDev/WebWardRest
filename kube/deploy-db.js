const { URL } = require('url')
const {
    isSameService, namespace, createKubeService,
    createKubeDeploy, connectionForMinikube,
    connectionForKubernetes, connectionForDocker,
    extractConnectionInformation, searchKubeDeploy,
    searchKubeService, updateKubeService,
    exchangeKubeService
} = require('./utils')
const { postgres_deploy, postgres_service_cluster, postgres_service_node } = require('../db/kube-files')

const Client = require('kubernetes-client').Client
const config = require('kubernetes-client').config;
const deployer = require('./deployer')
var Docker = require('dockerode');
const db = require('../db/index')

/**
 * A REST API node will detect if there are a database and if we have access to that DB. 
 * If not then it will deploy a new one.
 * The rest of the nodes will detect if exists the service for the postgresDB.
 */
async function deployDBIfNecessary(debug = true) {
    if (process.kubernetes && process.kube_client) {
        /**
         * @type {Client}
         */
        let client = process.kube_client;
        await deployDBKube(client, postgres_deploy, postgres_service_cluster, debug);

    } else if (process.docker && process.docker_client) {

    } else if (process.bare_metal && process.minikube_access) {
        //Minikube, then we need to access it across a IP we cant use DNS
        /**
         * @type {Client}
         */
        let client = process.kube_client;
        await deployDBKube(client, postgres_deploy, postgres_service_node, debug);
    } else {
        //Bare-metal NOT NOW
        throw new Error('Not access to a deployment system')
    }
}
async function deployDBKube(client, kubeDep, kubeSer, debug = true) {
    try {
        await checkPostgreDB();
    } catch (err) {
        //We cant access DB so try deploy our own
        if (debug)
            console.log("No DB running...")
        try {
            let dep
            try {
                let timeout = new Promise((resolve,reject) =>{
                    setTimeout(()=>{
                        reject("Timeout exceded");
                    },5000)
                })
                dep =  await Promise.race([searchKubeDeploy(client, kubeDep.metadata.name), timeout]);
            } catch (err) { }

            if (!dep) {
                await createKubeDeploy(client, kubeDep);
                dep = await searchKubeDeploy(client, kubeDep.metadata.name);
            }
            //We have found the deployment
            try {
                let timeout = new Promise((resolve,reject) =>{
                    setTimeout(()=>{
                        reject("Timeout exceded");
                    },5000)
                })
                let ser = await Promise.race([searchKubeService(client, kubeSer.metadata.name), timeout])
                if (!ser) {
                    await createKubeService(client, kubeSer);
                } else if (!isSameService(ser, kubeSer)) {
                    ser = (await exchangeKubeService(client, kubeSer)).body;
                }
                let connInfo = extractConnectionInformation(ser, 5432, 'db')
                await reconnectDB(connInfo.url, connInfo.port, debug)
            } catch (err2) {
                try{
                    let ser = await createKubeService(client, kubeSer);
                    let connInfo = extractConnectionInformation(ser, 5432, 'db')
                    await reconnectDB(connInfo.url, connInfo.port, debug)
                }catch(err3){
                    if (debug)
                        console.log(err2)
                    //No service then create it
                    throw new Error("Error with Service, " + err2.message ? err2.message : err2.toString())
                }
                
            }
        } catch (err2) {
            throw new Error("Cant deploy DB. Reason: " + err2.message ? err2.message : err2.toString())
        }
    }
}
async function checkPostgreDB() {
    await db.connect();
    await db.query("SELECT NOW()");
}


async function reconnectDB(host, port, debug = true) {
    try {
        await db.end();
    } catch (err) { }
    if (debug)
        console.log(`Reconnecting DB  ${host}:${port}...`)
    try {
        await db.reconnect({
            user: process.env.PGUSER || 'webward',
            host: host,
            database: process.env.PGDATABASE || 'webward',
            password: process.env.PGPASSWORD || 'webward',
            port: port || '5432'
        })
        //Sucess, update Environment VARS
        if (!process.env.PGUSER)
            process.env.PGUSER = 'webward'
        if (!process.env.PGDATABASE)
            process.env.PGDATABASE = 'webward'
        if (!process.env.PGPASSWORD)
            process.env.PGPASSWORD = 'webward'
        process.env.PGPORT = port ? port : 5432;
        process.env.PGHOST = host;
        if (debug)
            console.log("Reconnected")
    } catch (err) {
        if (debug)
            console.error(err)
    }
}

exports.deployDBIfNecessary = deployDBIfNecessary;