# Webhook Module

To allow the activation of a pipeline by external agents we need a webhook.

Por ejemplo, en un proyecto web, nuestros desarrolladores utilizan "git" como el sistema de control de versiones, y queremos que nos notifiquen cuando se realiza un cambio de código para comenzar su análisis de seguridad.
To achieve this we can install a simple script in the hooks subdirectory of the Git directory best as a post-commit hook. This script only need to do an HTTP Get to our webhook endpoint: 

```
curl https://{Web Ward URL}/api/webhook/{Webhook ID}
```
This will trigger the the start of the pipeline.