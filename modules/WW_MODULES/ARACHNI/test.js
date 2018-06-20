const { ModuleWorkbench } = require('../../WORKBENCH/tester')
const { getModuleFromDirectory } = require('../../loader')
const path = require('path')
main();

async function main() {
    process.env.ARACHNI_URL = "192.168.2.1"
    process.env.ARACHNI_PORT = "7331"
    /**
 * Node configuration
 */
    var inputParms = [{

    }]
    var properties = [];
    //Selected Module
    var modPath = path.join(__dirname, "./").toString();
    var modInfo = await getModuleFromDirectory(modPath)

    const workbench = new ModuleWorkbench(modInfo.mod, modInfo.template, console);
    workbench.setFakeNodeCB((nod) => {
        return () => {
            console.log(nod.i_params)
        }
    })
    workbench.testNode.pipe.id =  "70e899b4-5f5f-11e8-b1a2-a7c714d4a8f4";
    workbench.setProperties([{
        "nickname": "URL",
        "name": "_SCAN_URL",
        "type": "URL",
        "value": "http://192.168.2.1:80",
        "optional": false
    },{
        "nickname": "ID",
        "name": "_SCAN_ID",
        "type": "STRING",
        "value": "dc97831d6c639136b1e5f5086c95a390",//If alredy exists a scan use this to get the scan
        "optional": false
    }])//542b9804f32c476d7ff1bf30a00bdb32
    var interval = setInterval(()=>{
        workbench.runController()
    },1000)
}