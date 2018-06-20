const { ModuleWorkbench } = require('../../WORKBENCH/tester')
const { getModuleFromDirectory } = require('../../loader')
const path = require('path')
main();

async function main() {
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
    //workbench.testNode.pipe.id =  "70e899b4-5f5f-11e8-b1a2-a7c714d4a8f4";
    workbench.setProperties([{
        "nickname": "URL",
        "name": "_SCAN_URL",
        "type": "URL",
        "value": 'https://www.inycom.es',
        "optional": false
    }])
    var interval = setInterval(()=>{
        workbench.runController()
    },1000)
}