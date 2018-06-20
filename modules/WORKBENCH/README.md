# Web Ward Module Workbench
Para poder desarrollar nuevos módulos es necesario disponer de un entorno de pruebas que facilite la labor.

## Example : Testing script

```
    var modPath = path.join(__dirname, "./").toString();
    //Load Module
    var modInfo = await getModuleFromDirectory(modPath)
    //Create the workbench
    const workbench = new ModuleWorkbench(modInfo.mod, modInfo.template, console);
    
    //When the fake node is run this will be called
    workbench.setFakeNodeCB((nod) => {
        return () => {
            console.log(nod.i_params)
        }
    })


    //To configure properties or Input parameters
    workbench.setProperties([{
        "nickname" : "Simple propertie",
        "name" : "_MESSAGE",
        "value" : "Este es un mensaje para el nodo",
        "optional" : false
    }, ...])

    //With the input "_ERROR" we check how this node reacts
    workbench.setInputParams([{
        "nickname" : "Error for the node",
        "name" : "_ERROR",
        "value" : "This is a simple error",
        "optional" : false
    }, ...])


    //Run one time the workbench
    workbench.runController()
    ...
    (WAIT...)
    ...
    workbench.runController()
    
    //Or do somthing lik:
    var interval = setInterval(()=>{
        workbench.runController()
    },1000)
    setTimeout(()=>{
        clearInterval(interval)
    },6000)

```