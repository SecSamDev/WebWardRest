const fs = require('fs');
const child_process = require('child_process');
const os = require('os');

function init(debug = true) {
    if (debug)
        console.log("Platfrom detected: " + process.platform)
    //Container running inside kubernets
    process.kubernetes = false;
    //Namespace of the kubernetes
    process.kube_namespace = "";
    //Runing inside docker
    process.docker = false;
    //Runing in bare-metal
    process.bare_metal = false;
    //We have access to docker daemon
    process.docker_access = false;
    //We have access to kubectl command
    process.kubectl_access = false;
    //We have access to minikube command
    process.minikube_access = false;
    if (process.platform === "linux") {
        try {
            //cat /proc/self/cgroup
            let cgroup = (child_process.execSync('cat /proc/self/cgroup').toString('utf8'));
            process.docker = cgroup.match(new RegExp('docker', 'i')) ? true : false;
            if (process.docker === false) {
                if (debug)
                    console.log(`Trying to detect kubernetes...`)
                try {
                    fs.accessSync('/var/run/secrets', fs.constants.R_OK | fs.constants.W_OK);
                    process.kubernetes = true;
                    try {
                        fs.accessSync('/var/run/secrets/kubernetes.io/serviceaccount/namespace', fs.constants.R_OK | fs.constants.W_OK);
                        process.kube_namespace = child_process.execSync('cat /var/run/secrets/kubernetes.io/serviceaccount/namespace').toString('utf8')
                        if (debug)
                            console.log(`Running in Kubernetes with namespace ${process.kube_namespace}`)
                    } catch (err) {
                        if (debug)
                            console.log(`Running in Kubernetes but not available kubernetes namespace`)
                        process.kube_namespace = "";
                    }
                } catch (err) {
                    if (debug)
                        console.log(`Not running in Kubernetes`)
                    checkDockerEnv(debug);
                }
            } else {
                if (debug)
                    console.log(`Running in Docker Environment`)
            }
        } catch (err) {
            if (debug)
                console.log(`Not running in Docker`)
        }
    } else {
        if (debug){
            console.log(`Running on Windows`)
        }
        process.bare_metal = true;
        checkDockerEnv(debug);
    }
}

function checkDockerEnv(debug = true) {
    process.kubernetes = false;
    process.bare_metal = true;
    try {
        let dockerProcess = (child_process.execSync('docker info',{stdio : [null,null,null]}).toString('utf8'));
        process.docker_access = dockerProcess.match(new RegExp('Containers:', 'i')) ? true : false;
    } catch (err) {
        process.docker_access = false;
    }


    if (process.docker_access === true) {
        //We have access to a docker daemon
    } else {
        //Check if we have access to a kubectl command
        try {
            let kubectlProcess = (child_process.execSync('kubectl version').toString('utf8'));
            process.kubectl_access = kubectlProcess.match(new RegExp('Platform:', 'i')) ? true : false;
        } catch (err) {
            process.kubectl_access = false;
        }
        try {
            let minikubeProcess = (child_process.execSync('minikube version').toString('utf8'));
            process.minikube_access = minikubeProcess.match(new RegExp('v([0-9].*)+', 'i')) ? true : false;
            if(debug)
                console.log("Running on Minikube")
        } catch (err) {
            process.minikube_access = false;
        }
    }
}
exports.init = init;