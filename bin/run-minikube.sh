#!/bin/bash
# kubectl create secret docker-registry webward-secret --docker-server="docker.io/secsamdev" --docker-username="" --docker-password="" --docker-email=""
kubectl create -f ./deploy.json
kubectl expose deployment webward --type="NodePort" --port=80 --target-port=80
nodeIP=$(kubectl get nodes --selector=kubernetes.io/role!=master -o jsonpath={.items[*].status.addresses[*].address} | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b")
webPort=$(kubectl get service webward | grep -Po '(?<=80:)[^/]*')
explorer "http://${nodeIP}:${webPort}"
echo -e 'Server running on: \e]8;;\ahttp://${nodeIP}:${webPort}\e]8;;\a'