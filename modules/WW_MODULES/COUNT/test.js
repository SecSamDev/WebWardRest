const {ModuleWorkbench} = require('../../WORKBENCH/tester')
const { getModuleFromDirectory } = require('../../loader')
const path = require('path')
main();

async function main() {
    /**
 * Node configuration
 */
    var inputParms = [{

    }]
    var properties = [
        {
            "nickname" : "Counter",
            "name" : "_COUNT",
            "type" : "NUMBER",
            "value":"0",
            "optional" : false
        },
        {
            "nickname" : "Count until",
            "name" : "_COUNT_TO",
            "type" : "NUMBER",
            "value":"10",
            "optional" : false
        }
    ];
    //Selected Module
    var modPath = path.join(__dirname, "./").toString();
    var modInfo = await getModuleFromDirectory(modPath)

    const workbench = new ModuleWorkbench(modInfo.mod, modInfo.template, console);
    workbench.setProperties(properties)
    workbench.setFakeNodeCB((nod) => {
        return () => {
            console.log(nod.i_params)
        }
    })
    while(true){
        workbench.runController()
        console.log(properties)
    }

}