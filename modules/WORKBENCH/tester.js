const { PIPELINE_STATUS } = require('../pipeline_status')
const { getModuleFromDirectory } = require('../loader')
const path = require('path')
const { PipelineNode, Pipeline, pipelineNodeFromJSON, connectorsFromJSONarray, NodeConnector } = require('../pipeline')
const { PipeLifecycleController } = require('./fake-controller')



class ModuleWorkbench {
    /**
     * Create a ModuleWorkbench to test modules
     * @param {WebWardModule} mod WebWard Module
     * @param {*} template Template for the module
     * @param {Console} consl Console to log data
     */
    constructor(mod, template, consl = console) {
        this.mod = mod;
        this.template = template;
        this.pipe = new Pipeline("FakePipeID", PIPELINE_STATUS.STARTED, Date.now(), Date.now(), "OwnerFake", "ProjectFake", Date.now(), Date.now(), null)
        this.fakeController = new PipeLifecycleController(this.pipe, null, 2, consl)

        //Fake NODE
        this.fakeNode = new PipelineNode("FakeNodeID", "FakeNode", this.pipe, "ANY",
            [], [], [],
            [], [], [], [], [],
            [], PIPELINE_STATUS.WAITING, this.mod);
        var fakeConn = new NodeConnector(78164312, 0, this.fakeNode, []);
        this.fakeNode.inputConnectors = [fakeConn];

        //The execution  function to display out values
        this.fakeNode.doJob = () => {
            consl.log(this.fakeNode.i_params)
            consl.log(this.fakeNode.o_params)
        }

        //Testing node
        this.testNode = new PipelineNode("Node2Test", this.mod.tag, this.pipe, this.template.type,
            [], this.template.inputParams, [],
            this.template.outputParams, [], this.template.errorParams, [], [],
            [], PIPELINE_STATUS.STARTED, this.mod)
        //var iConn = this.template.inputConnectors ? connectorsFromJSONarray(this.template.inputConnectors, 0, this.testNode) : [];
        var iConn = connectorsFromJSONarray(this.template.inputConnectors, 0, this.testNode);
        var oConn = this.template.outputConnectors ? connectorsFromJSONarray(this.template.outputConnectors, 1, this.testNode) : [];
        var eConn = this.template.errorConnectors ? connectorsFromJSONarray(this.template.errorConnectors, 2, this.testNode) : [];
        this.testNode.inputConnectors = iConn;
        this.testNode.outputConnectors = oConn;
        this.testNode.errorConnectors = eConn;

        //Set output testNode to this.fakeNode
        for (let i = 0; i < oConn.length; i++) {
            oConn[i].addConnector(fakeConn);
            fakeConn.addConnector(oConn[i])
        }
        for (let i = 0; i < eConn.length; i++) {
            eConn[i].addConnector(fakeConn);
            fakeConn.addConnector(eConn[i])
        }
        this.pipe.nodes = [this.fakeNode, this.testNode];
        this.testNode.fillReferences([this.fakeNode, this.testNode])
        this.fakeNode.fillReferences([this.fakeNode, this.testNode])
    }
    setProperties(props) {
        this.testNode.properties = props;
    }
    setInputParams(parms) {
        this.testNode.i_params = parms;
    }
    /**
     * Pass a function that returns the function to execute by the fake node. 
     * The first parameter passed to the function is the Node reference.
     * @param {function(PipelineNode):function} cb 
     */
    setFakeNodeCB(cb) {
        this.fakeNode.doJob = cb(this.fakeNode);
    }
    /**
     * Execute one time the controller. (All the nodes in order)
     */
    runController() {
        this.fakeController.runNodes();
    }
}

async function workbenchFromPath(modulePath,customCons = console) {
    var modPath = modulePath;
    if (!path.isAbsolute(modulePath))
        modPath = path.join(__dirname, modulePath).toString();
    var modInfo = await getModuleFromDirectory(modPath)
    return new ModuleWorkbench(modInfo.mod, modInfo.template, customCons);
}


exports.ModuleWorkbench = ModuleWorkbench;
exports.workbenchFromPath = workbenchFromPath;
