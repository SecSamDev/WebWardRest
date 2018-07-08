# Proceso instalación CentOS 7

Durante todo el desarrollo de la plataforma se han hecho pruebas tanto en un entorno local en un ordenador portátil como en un entorno virtualizado basado en Minikube. Las pruebas finales han sido llevadas a cabo en un servidor privado haciendo uso de los servicios de Amazon Web Services.
En concreto el servidor está basado en CentOS 7 sobre el que se han instalado todos los programas necesarios comenzando por la actualización de todos sus componentes, así como la instalación de la base de datos PostgreSQL.

```
sudo yum update && sudo yum upgrade
sudo yum install postgresql10 postgresql10-server postgresql10-contrib
sudo /usr/pgsql-10/bin/postgresql-10-setup initdb
sudo systemctl start postgresql-10
sudo systemctl enable postgresql-10
# Ser root
sudo su
# Cambiar a usuario postgres
su -l postgres
#Conectarse a la base de datos
psql
CREATE EXTENSION IF NOT EXISTS “pgcrypto”;
CREATE EXTENSION IF NOT EXISTS “uuid-ossp”;
CREATE USER webward WITH SUPERUSER PASSWORD ‘webward’;
CREATE DATABASE webward;
GRANT ALL PRIVILEGES ON DATABASE webward TO webward;
```

Comprobamos que la base de datos está funcionando correctamente y continuamos con la instalación de git, apache y links:

```
sudo yum install git links httpd
sudo systemctl enable httpd.service
sudo systemctl start httpd.service
links http://localhost:80
```

Ahora instalaremos un controlador de versiones para nodejs llamado NVM que nos permitirá tener diferentes versiones instaladas al mismo tiempo:

```
curl https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install node
# Siguiente linea para permitir el acceso al comando npm usando sudo
cat alias sudo=’sudo env PATH=$PATH:NVM_BR’ >> ~/.bashrc
# Instalar sistema de gestión y monitorización de aplicaciones
sudo npm install pm2 -g
```

Configuramos las variables de entorno a través del fichero ~/.bashrc .

```
export PORT=”3000”
export PGHOST=”localhost”
export PGPORT=”5432”
export PGUSER=”webward”
export PGDATABASE=”webward”
export PGPASSWORD=”webward”
export ADMIN_PASS=”MyDefaultAdminPass”
```

Clonamos el repositorio:

```
sudo git clone https://github.com/SecSamDev/WebWardRest.git
```

A partir de este punto cada vez que hagamos una modificación del código fuente en el repositorio, simplemente deberemos utilizar el comando ¨git pull¨en la carpeta en la que fue clonado el repositorio.
El código fuente ya está en nuestro servidor, pero este hace uso de librerias que deberemos instalar utilizando:

```
sudo npm install
```

Con el programa pm2, el cual hemos isntalado anteriormente, lanzaremos nuestra aplicación nodejs de forma que se ejecute en cada reinicio:

```
pm2 start npm -- start
```

El anterior comando, que deberá ejecutarse en la carpeta de nuestra aplicación lanza el comando npm con el argumento start,la cual es una forma muy común de lanzar aplicaciones basadas en nodejs.
La configuración del servidor web Apache se hace modificando el archivo httpd.conf:

```
<VirtualHost *:80>
  ServerName webward.com
  ServerAlias www.webward.com
  DocumentRoot /var/www/webward/
  Options -Indexes
  ProxyRequests off
  ProxyPass /index.html !
  ProxyPass /public/ !
  ProxyPass / http://127.0.0.1:3000/
  ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

Hay que habilitar la redirección y también comprobar los permisos de SELinux:

```
sudo /usr/sbin/setsebool -P httpd_can_network_connect 1
# Desactivamos SELinux pues es dificil de configurar correctamente
sudo setenforce 0
```

Comprobamos que el servidor web está funcionando haciendo una petición desde nuestro navegador hacia la URL remota en la que está alojado nuestro servidor, iniciamos sesión con usuario Admin y contraseña Admin que es el usuario y contraseña por defecto (se puede cambiar dichos valores) y navegamos por las diferentes secciones para comprobar que las peticiones llegan a nuestro servidor Nodejs pero que los archivos estáticos de la web son servidos por Apache.
En las nuevas versiones de centOS, se permite crear servicios personalizados haciendo posible que se ejecuten scripts en cada reinicio de la máquina. Nos valdremos de esto para crear un servicio que lance la instancia del escáner web Arachni.

```
# vi /etc/systemd/system/arachni.service
[Unit]
Description=Autoexecute Arachni locally in 127.0.0.1:7331
After=network.target

[Service]
Type=simple
ExecStart=/var/tmp/arachni_script.sh
TimeoutStartSec=0

[Install]
WantedBy=default.target

# vi /var/tmp/arachni_script.sh
#!/bin/bash
/home/centos/arachni-1.5.1-0.5.12/bin/arachni_rest_server --address=127.0.0.1
```
Solo nos faltará indicar a nuestra aplicación donde está funcionando la instancia de Arachni a través de variables de entorno:
```
# vi ~/.bashrc
export ARACHNI_URL="127.0.0.1"
export ARACHNI_PORT="7331"
```
Reiniciamos pm2 y aplicamos cambios:
```
pm2 update
pm2 stop all
pm2 kill
pm2 start npm --start
```
Los logs de pm2 nos informaran si el proceso ha iniciado correctamente:
```
0|npm      | > webwardrest@0.0.0 start /home/centos/WebWardRest
0|npm      | > node ./bin/init
0|npm      | Cluster Name: eomej2ox3pza71y
0|npm      | Platfrom detected: linux
0|npm      | Trying to detect kubernetes...
0|npm      | Not running in Kubernetes
0|npm      | Postgres DB running on <localhost:5432>...
0|npm      | Trying ARACHNI on 127.0.0.1:7331
0|npm      | ARACHNI: 127.0.0.1 7331
0|npm      | Arachni working
0|npm      | Cluster Name: eomettqgxetbhxfgi
0|npm      | 2018-06-14T15:11:22.776Z Worker is running on 31806
0|npm      | ARACHNI: 127.0.0.1 7331
```
 
