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
            if(nod.i_params[0] && nod.i_params[0].value){
                console.log(nod.i_params[0].value)
            }
        }
    })
    workbench.setProperties([{
        "nickname": "Template",
        "name": "_TEMPLATE",
        "type": "STRING",
        "value": `
        Scan finished for URL: #{_SCAN.url}
        Issues:
        #[_SCAN.issues]
        Name: #{$.name}
        Severity: #{$.severity}
        Vector: #{$.vector} 
        Found in URL: #{$.url}
        #[_SCAN.issues]
        `,
        "optional": true
    }])
    workbench.setInputParams([{
        "nickname": "Val",
        "name": "_MESSAGE",
        "type": "STRING",
        "value": "How How How",
        "optional": true
    }, {
        "nickname": "Val",
        "name": "_SCAN",
        "type": "JSON",
        "value": {
            "url": "http://192.168.2.1/",
            "issues": [
                {
                    "name": "Missing 'X-Frame-Options' header",
                    "severity": "low",
                    "check": "",
                    "vector": "serverArachni::Element::Server",
                    "url": "http://192.168.2.1/"
                },
                {
                    "name": "Insecure 'Access-Control-Allow-Origin' header",
                    "severity": "low",
                    "check": "",
                    "vector": "serverArachni::Element::Server",
                    "url": "http://192.168.2.1/"
                },
                {
                    "name": "Allowed HTTP methods",
                    "severity": "informational",
                    "check": "",
                    "vector": "serverArachni::Element::Server",
                    "url": "http://192.168.2.1/"
                }
            ]
        },
        "optional": true
    }])
    var interval = setInterval(() => {
        workbench.runController()
    }, 1000)
}