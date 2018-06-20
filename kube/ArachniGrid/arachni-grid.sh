#!/bin/bash

# set-e allow us to kill the container if arachni or sshd fails
set -e

RPCD_ADDRESS=$(ifconfig eth0 | grep "inet " | awk -F'[: ]+' '{ print $4 }')
echo ${RPCD_ADDRESS}
echo ${HOSTNAME}

# If we have a neighbour (!= localhost) then we attach us to him
if [[ -z "${RPCD_NEIGHBOUR}" ]];
then 
    
    # Execute in parallel
    #First arachni witouth neighbour
    #Then SSH as a process not a daemon
    /usr/sbin/sshd -D &
    #
    #/opt/arachni/bin/arachni_rpcd --nickname="${HOSTNAME}" --address=${RPCD_ADDRESS}
    /opt/arachni/bin/arachni_rest_server --address=${RPCD_ADDRESS} --authentication-username arachni --authentication-password arachni
    
else
    #First arachni
    /usr/sbin/sshd -D &
    #
    #/opt/arachni/bin/arachni_rpcd --nickname="${HOSTNAME}" --address=${RPCD_ADDRESS} --neighbour=${RPCD_NEIGHBOUR}
    /opt/arachni/bin/arachni_rest_server --address=${RPCD_ADDRESS} --authentication-username arachni --authentication-password arachni
    #Then SSH as a process not a daemon
fi

