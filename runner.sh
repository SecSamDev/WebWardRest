#!/bin/bash
iptables -A FORWARD -i docker0 -o eth0 -j ACCEPT
iptables -A FORWARD -i eth0 -o docker0 -j ACCEPT
iptables -A FORWARD -i eth0 -o docker0 -m state --state RELATED,ESTABLISHED -j ACCEPT 
iptables -I INPUT -p tcp -m state --state NEW --dport 5432 -j ACCEPT
/sbin/sysctl -w net.ipv4.conf.all.forwarding=1
docker run --add-host="database:$(ifconfig ens33| grep 'inet ' | cut -d: -f2 | awk '{print $2}')" -v /var/run/docker.sock:/var/run/docker.sock -e PGHOST=database -e PGPORT=5432 -e PGUSER=webward -p80:80  secsamdev/webward