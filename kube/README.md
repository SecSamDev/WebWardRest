# Deployment

This folder stores all the information, all the Dockerfiles and Kubernetes YAML deployment files.

## Scripts

There are a list of scripts needed by the platform to interact with kubernetes and docker API.

- **detectENV** : allow us to know the deployment infraestructure: container running on Kubernetes cluster, container running on Docker, BareMetal with access to docker or kubernetes API or BareMetal witouth deployment infraestructure.

- **init** : Initializes the deployment infraestructure and starts the Kubernetes Client or the Docker client. Retrieves information about the running containers etc

- **deployer** : library to start new containers.