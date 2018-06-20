#!/bin/bash
iptables -A FORWARD -i docker0 -o eth0 -j ACCEPT
iptables -A FORWARD -i eth0 -o docker0 -j ACCEPT
iptables -A FORWARD -i eth0 -o docker0 -m state --state RELATED,ESTABLISHED -j ACCEPT 
iptables -I INPUT -p tcp -m state --state NEW --dport 5432 -j ACCEPT
/sbin/sysctl -w net.ipv4.conf.all.forwarding=1
# First remove old containers
docker ps -aq --no-trunc |xargs docker rm

# Pull from origin
git pull

#Remove image
docker images | awk '$1 == "secsamdev/webward" { print $3}' | xargs docker rmi

#Build image
docker build -t secsamdev/webward .