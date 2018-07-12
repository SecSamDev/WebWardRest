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
            if (nod.i_params[0] && nod.i_params[0].value) {
                console.log(nod.i_params[0].value)
            }
        }
    })
    workbench.setProperties([{
        "nickname": "URL",
        "name": "_URL",
        "type": "STRING",
        "value": "",
        "optional": false
    }, {
        "nickname": "Token",
        "name": "_TOKEN",
        "type": "STRING",
        "value": "",
        "optional": true
    }])
    workbench.setInputParams([{
        "nickname": "Val",
        "name": "_MESSAGE",
        "type": "STRING",
        "value": "How How How",
        "optional": true
    }])
    var interval = setInterval(() => {
        workbench.runController()
    }, 1000)
}