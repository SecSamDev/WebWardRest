/**
 * Deployment of PostgresDB for WebWard. This DB is preconfigured.
 */
const postgres_deploy = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
        name: "ww-postgres",
        labels: {
            app: "ww-postgres"
        }
    },
    spec: {
        replicas: 1,
        selector: {
            matchLabels: {
                app: "ww-postgres"
            }
        },
        template: {
            metadata: {
                labels: {
                    app: "ww-postgres"
                }
            },
            spec: {
                containers: [
                    {
                        name: "ww-postgres",
                        image: "secsamdev/ww-postgres",
                        ports: [{
                            containerPort: 5432
                        }],
                        "imagePullPolicy" : "Always"
                    }
                ]
            }
        }
    }
}
/**
 * This service allow us to access the PostgreDB from the host.
 */
const postgres_service_node = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
        name: "ww-postgres",
        labels: {
            app: "ww-postgres"
        }
    },
    spec: {
        type: "NodePort",
        ports: [
            {
                name : "db",
                port: 5432,
                protocol: "TCP",
                targetPort: 5432
            },{
                name : "ssh",
                port: 22,
                protocol: "TCP",
                targetPort: 22
            }
        ],
        selector: {
            app: "ww-postgres"
        }
    }
}
const postgres_service_cluster = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
        name: "ww-postgres",
        labels: {
            app: "ww-postgres"
        }
    },
    spec: {
        type: "ClusterIP",
        ports: [
            {
                name : "db",
                port: 5432,
                protocol: "TCP",
                targetPort: 5432
            },{
                name : "ssh",
                port: 22,
                protocol: "TCP",
                targetPort: 22
            }
        ],
        selector: {
            app: "ww-postgres"
        }
    }
}
/**
 * This service allow other Pods inside kubernetes cluster communicate with the DB.
 */
const postgres_service_DNS = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
        name: "ww-postgres-dns",
        labels: {
            app: "ww-postgres"
        }
    },
    spec: {
        type: "ExternalName",
        externalName: "postgres.webward.com",
        ports: [
            {
                port: 5432,
                protocol: "TCP",
                targetPort: 5432
            }
        ],
        selector: {
            app: "ww-postgres"
        }
    }
}
/**
 * Request for space allocation for the DB
 */
const postgres_volume_claim = {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
        name: "ww-postgres-claim"
    },
    spec: {
        accessModes: "ReadWriteMany",
        resources : {
            requests : {
                storage : "1Gi"
            }
        },
        selector: {
            matchLabels: {
                app : "ww-postgres"
            }
        }
    }
}

exports.postgres_service_cluster = postgres_service_cluster;
exports.postgres_service_node = postgres_service_node;
exports.postgres_deploy = postgres_deploy;