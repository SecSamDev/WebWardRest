const { ModuleWorkbench } = require('../../WORKBENCH/tester')
const { getModuleFromDirectory } = require('../../loader')
const path = require('path')
const fs = require('fs')
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
    var modInfo = await getModuleFromDirectory(modPath,"","HTML_TEMPLATE")

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
        "value": fs.readFileSync('./test-html.pug',{encoding : 'utf-8'}),
        "optional": true
    }])
    workbench.setInputParams([{
        "nickname": "Val",
        "name": "_MESSAGE",
        "type": "STRING",
        "value": "How How How",
        "optional": true
    },{
        "nickname": "Val",
        "name": "USER",
        "type": "STRING",
        "value": {
            "Name" : "Samuel",
            "Surname" : "Garces",
            "Friends" : [{
                "Name" : "Friend1",
                "Surname" : "Friend1.1",
            },
            {
                "Name" : "Friend2",
                "Surname" : "Friend2.1",
            }]
        },
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