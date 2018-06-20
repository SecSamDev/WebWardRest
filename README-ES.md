# WebWard

Plataforma de Seguridad Continua

### Instalación

Lanza el contenedor en un sistema kubernetes y ya esta, este *pod* se encargará de procurarse la BB.DD así como el resto de PODs que pueda necesitar.

#### Requirements
Un cluster kubernetes.

Puede llegar a necesitar una BB.DD PostgreSQL pero puede crearsela también el mismo. Los parametros de la base de datos se pasan como Variables de Entorno:
```
PGUSER webward
PGHOST localhos
PGDATABASE webward
PGPASSWORD webward
PGPORT 5432
```

Si se le pasa los parametros de conexión a la base de datos entonces o el usuario debe tener acceso de administrador para poder crear extensiones o crear previamente las extensiones:

```
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Como medida de buenas practicas es conveniente que se ejecute la plataforma en un *namespace* aislado del resto de *PODs*.
Si el sistema se va a usar en un entorno docker hay que actualizar las tablas de *iptables* para permitir el acceso a los contenedores desde el host y el acceso a la API de docker por parte del contenedor.

```
iptables -A FORWARD -i docker0 -o eth0 -j ACCEPT
iptables -A FORWARD -i eth0 -o docker0 -j ACCEPT
iptables -A FORWARD -i eth0 -o docker0 -m state --state RELATED,ESTABLISHED -j ACCEPT 
iptables -I INPUT -p tcp -m state --state NEW --dport 5432 -j ACCEPT

# Allow ipv4 forwarding
/sbin/sysctl -w net.ipv4.conf.all.forwarding=1
```
La infraestructura que se generará será algo similar a la siguiente:

![Infraestructura](./WebWardInfraestructure.png)


Nosotros como administradores del sistema solo necesitamos proveer de un contenedor API REST de WebWard así como de recursos de virtualización, ya sea acceso a la API Docker o Kubernetes. El resto de la infraestructura la desplegará WebWard. Se deja como opcional que el administrador de sistemas aprovisione a la plataforma con una BB.DD PostgreSQL, el sistema puede autoaprovisionarsela pero consideramos que es mejor una BB.DD externa a la infraestructura de contenedores.

#### Kubernetes Service Configuration

Tenemos que asegurarnos que el pod con la API REST obtenga las credenciales para acceder a la API de KUBERNETES. 

Para ello el token de credenciales, el certificado y el nombre del namespace deben estar alojados en: 

```
/var/run/secrets/kubernetes.io/serviceaccount/token
/var/run/secrets/kubernetes.io/serviceaccount/ca.crt
/var/run/secrets/kubernetes.io/serviceaccount/namespace
```

### GUIA de Directorios del proyecto

- **arachni_rpc** : Contiene los scripts en *ruby* para comunicarse, mediante RPC, con el grid de Arachni (Web Security Scanner).

- **bin** : Contiene los binarios de ejecución de la aplicación.

- **controllers** : Contiene los controladores de rutas de la API REST. Los controladores manejan toda la lógica de cada uno de los endpoints de la API, para simplificar la programación, hay cuatro controladores por cada ruta, uno por cada uno de los roles de usuario existentes.

- **db**: Script de comunicación e inicialización de la base de datos.

- **kube**: Almacena todos los scripts de despliegue de la infraestructura, los Dockerfiles de los contenedores así como los ficheros YAML de despliegue en kubernetes.

- **modules** : Modulos de Web Ward. En este directorio se almacenan todos los scripts necesarios para recoger un **pipeline** libre de la base de datos, todos sus nodos y ejecutar la lógica de cada nodo. Cada nodo implementa su lógica a traves de un módulo identificado por la propiedad *TAG*.

- **public** : Ficheros publicos que deberán ser servidor por un Servidor Web. Vease nginx o Apache.

- **routes** : La lógica de las rutas HTTP. Esta es delegada a su vez a los controladores.

- **test** : Ficheros para realizar pruebas.

- **views** : Solo contiene el fichero HTML original que carga todo el Frontend con ANGULAR.

- **ww_libraries** : Librerias que pueden ser usadas por módulos. Estas librerias están preparadas para ser seguras y a prueba de errores. Algunos ejemplos de librerias: ArachniRPC, Deployer,TelegramBot... Estas librerias exportan un "wrapper" que le simplifica la funcionalidad a los scripts de los modulos.


### Variables de Entorno importantes

Para el contenedor principal que ejecuta el servidor REST y la funcionalidad en backend de los pipelines tenemos:

- **EXECUTION_MODE**: Permite cambiar el modo de ejecución del contenedor pudiendo elegir entre solo API REST, solo Cluster de Pipelines o un modo mixto. Los valores admitidos son: REST, REST_PIPER y PIPER. Por defecto se aplica el modo REST_PIPER (ambos).


- **PGUSER**: Usuario de acceso a la base de datos PostgreSQL. Por defecto: *webward*


- **PGHOST**: Direccion IP o URL de la base de datos PostgreSQL. Por defecto: *localhost*


- **PGDATABASE**: Usuario de acceso a la base de datos PostgreSQL. Por defecto: *webward*


- **PGPASSWORD**: Contraseña de acceso a la base de datos PostgreSQL. Por defecto: *webward*


- **PGPORT**: Puerto de acceso a la base de datos PostgreSQL. Por defecto: *5432*

El contenedor que funciona como nodo para crear el Grid de Arachni necesita también acceso a la base de datos PostgreSQL. Podemos pasarle los parametros por variables de entorno:

- **POSTGRES_USERNAME**: Usuario de acceso a la base de datos PostgreSQL. Por defecto: *webward*


- **POSTGRES_HOST**: Direccion IP o URL de la base de datos PostgreSQL. Por defecto: *localhost*


- **POSTGRES_DATABASE**: Usuario de acceso a la base de datos PostgreSQL. Por defecto: *webward*


- **POSTGRES_PASSWORD**: Contraseña de acceso a la base de datos PostgreSQL. Por defecto: *webward*

Este contenedor permite ser accedido por el puerto 22 (SSH) por defecto, además tiene abiertos los puertos 7331 y 9292 que son los que utiliza arachni para su funcionamiento. 

Hay además una variable de entorno importante que debe ser pasada que es **RPCD_NEIGHBOUR** para poder conectarse a otros nodos del grid. Este es el codigo que se ejecuta por defecto al arrancar:

```
# set-e allow us to kill the container if arachni or sshd fails
set -e
if [[ -z "${RPCD_NEIGHBOUR}" ]];
then 
    # Execute in parallel
    #First arachni witouth neighbour
    arachni_rpcd --nickname=${HOSTNAME} --address=${RPCD_ADDRESS}  &
    #Then SSH as a process not a daemon
    /usr/sbin/sshd -D
else
    arachni_rpcd --nickname=${HOSTNAME} --address=${RPCD_ADDRESS} --neighbour=${RPCD_NEIGHBOUR} &
    #Then SSH as a process not a daemon
    /usr/sbin/sshd -D
fi
```

### Bootstrapping

En el proceso de arranque se sigue una serie de pasos:

1. Se comprueba el entorno en el que se está ejecutando el sistema:
    1. Primero la plataforma (linux o win32)
    2. Kubernetes, Docker o Bare-Metal
    3. En el caso de ser Bare-Metal comprueba si tiene acceso a Minikube, a la API de Kubernetes o a la API de Docker.
2. Comprueba si tenemos acceso a la BB.DD
    1. En caso de no tenerlo si tenemos acceso a una API de deploy buscamos si existe ya alguna (ww-postgres) o lanzamos una BB.DD.
3. Ahora comprobamos el tipo de ejecución y lanzamos la API REST, el *Pipeliner* o ambos.