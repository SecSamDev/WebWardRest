#!/bin/bash
# This script will execute commands in a container
container=`docker ps | awk '$2 == "secsamdev/webward" { print $1}'`

echo "Type the command to execute, followed by [ENTER]:"

while true; do 
	read comando
    docker exec $container $comando
done