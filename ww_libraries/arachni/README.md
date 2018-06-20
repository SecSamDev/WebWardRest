# ARACHNI Web Ward Library

- **arachni-REST** : Interfaz para realizar escaneres utilizando una interfaz HTTP REST. No permite conectarse a un Grid Arachni.

- **arachni-rpc** : Interfaz para realizar escaneres u8tilizando una interfaz RPC. Realmente se lanza un proceso ruby que contiene todo lo necesario para comunicarse con el Grid Arachni remoto a través de una conexion RPC.

- **constants** : Constantes usadas por arachni. Son constantes como el tipo de versiones SSL que acepta, de certificados...

- **arachni-scan-options** : Simple clase para crear configuraciones para realizar escaneos con Arachni.

## ARACHNI Wrapper

The wrapper is intended to be used inside a safe VM. This dont let the user access the functions of arachni directly.
How to use it: first we need to create the conexion:
```
let arachniService = node.getService('SCANNER');
if(arachniService){
    //We alredy have a instance stored
}else{
    //No instance created
    var token = node.getParam('_TOKEN');
    var instance = node.getParam('_INSTANCE_URL');
    //If we alredy have a token and a instance reuse it.
    arachniService = arachni(token,instance);
    node.registerService('SCANNER',arachniService);
}
```

Now we can use arachniService to SCAN

```
var url = node.getParam("_SCAN_URL");

//Create scan options or get it from Node Parameters
var opts = {
    ...
}
await arachniService.setOptions(opts);

//Start scanner
var scan = await arachniService.startScan(url || "localhost");
var status = await arachniService.isAlive();
var busy = await arachniService.isBusy();

//Get report
var report = arachniService.getReport();

//End Scan
await arachniService.exit();
```
