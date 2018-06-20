const module_library = require('../modules/module_library');
const loader = require('../modules/loader');
const {WebWardModule,NodeConnector,NodeParameter,PipelineNode} = require('../modules/module');
const util = require('util')
const cluster = require('cluster')

if(cluster.isMaster){
    
    main();
}else{
    test2();
}
async function main(){
    cluster.fork();
    await util.promisify(setTimeout)(1000)
    module_library.addModulesFromDirectory();
    
}
async function test2(){
    await util.promisify(setTimeout)(2000)
    let mod = module_library.findModuleInLibrary('LOGER_stdout')
    console.log(mod)
    let node = new PipelineNode("",mod.tag,"",[],[],[],[],[],[],[],[],0)
    mod.success(node)
}
