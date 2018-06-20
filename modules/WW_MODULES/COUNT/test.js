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
    workbench.runController()
    workbench.runController()
    workbench.runController()
    workbench.runController()
    workbench.runController()
    workbench.runController()
    workbench.runController()

}