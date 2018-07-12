const { PIPELINE_STATUS } = require('./pipeline_status')
const { prepareSandBox } = require('./safeNodeSandbox')
const { PipelineNode, NodeParameter, Pipeline } = require('./pipeline')
const { Script } = require('vm')
const { URL } = require('url')
const vm = require('vm')

class WebWardModule {
    /**
     * Creates a new WebWardModule
     * @param {string} origin Repository where we can found this module 
     * @param {string} tag Tag for identify this module. Needs to be unique
     * @param {Script} script Script code to execute in VM
     * @param {string[]} requires List of libraries that this module needs
     * @param {string[]} libraries List of libraries that this module needs
     * @param {string[]} injectors List of libraries that this module needs to inject to the node
     */
    constructor(origin, tag, script, requires = [], libraries = [], injectors = []) {
        /**
         * Repository where we can found this module 
         * @type {string}
         */
        this.origin = origin;
        /**
         * Tag for identify this module. Needs to be unique
         * @type {string}
         */
        this.tag = tag;
        /**
         * Script code to execute in VM
         * @type {Script}
         */
        this.script = script;
        /**
         * List of libraries that this module needs. This uses the require() function of nodejs.
         * @type {string[]}
         */
        this.requires = requires;
        /**
         * List of libraries that this module needs
         * @type {string[]}
         */
        this.libraries = libraries;
        /**
         * List of libraries that this module needs to inject to the node
         * @type {string[]}
         */
        this.injectors = injectors;
    }
    /**
     * Periodically the node needs to do things.
     * @param {PipelineNode} node 
     */
    run(node, cb) {
        try {
            let sandbox = prepareSandBox(this,node);
            let sbInterface = generateSandboxInterface(node);
            if (cb) {
                sandbox.callback = cb;
            } else {
                sandbox.callback = function () { }
            }
            const context = vm.createContext(Object.assign({ 'node': sbInterface }, sandbox));
            this.script.runInContext(context, { timeout: 1000 });
            sbInterface.setInterfaceAsFinish();
        } catch (err) {
            console.err(err)
            throw err;
        }
    }
    toJSON() {
        return {
            "tag": this.tag,
            "libraries": this.libraries,
            "injectors": this.injectors,
            "requires": this.requires,
            "origin": this.origin
        }
    }
}
/**
 * Interface to comunicate with the node, the pipeline controller, retrieve parameters of the node etc.
 * The purpouse of this function is to not allow the module script access to the PipelineNode class, 
 * banning all direct access to controller or node.
 * @param {PipelineNode} node Interface for this node
 */
function generateSandboxInterface(node) {
    var end_date = null;
    return {
        addProperties: (prop) => {
            if (!end_date) {
                node.addNodeProperties(prop);
                node.last_execution = Date.now();
            }
        },
        addProperty: (prop) => {
            if (!end_date) {
                node.addNodeProperties([prop]);
                node.last_execution = Date.now();
            }
        },
        removePropertyFuture: (prop, funcTime) => {
            if (!end_date || (end_date && node.last_execution && funcTime <= node.last_execution)) {

                node.removeProperty(prop);
                node.last_execution = funcTime;
            }
        },
        removeProperty: (prop) => {
            if (!end_date) {
                node.removeProperty(prop);
                node.last_execution = Date.now();
            }
        },
        setInterfaceAsFinish: () => {
            end_date = Date.now();
            node.last_execution = Date.now();
        },
        addPropertyFuture: (prop, funcTime) => {
            if (!end_date || (end_date && node.last_execution && funcTime <= node.last_execution)) {
                node.addNodeProperties([prop]);
                node.last_execution = funcTime;
            }
        },
        addPropertiesFuture: (prop, funcTime) => {
            if (!end_date || (end_date && node.last_execution && funcTime <= node.last_execution)) {
                node.addNodeProperties(prop);
                node.last_execution = funcTime;
            }
        },
        addOutParameters: (params) => {
            if (!end_date) {
                if (!params.length)
                    node.addOutParameters([params]);
                else
                    node.addOutParameters(params);
                node.last_execution = Date.now();
            }
        },
        addOutParametersFuture: (params, funcTime) => {
            if (!end_date || (end_date && node.last_execution && funcTime <= node.last_execution)) {
                if (!params.length)
                    node.addOutParameters([params]);
                else
                    node.addOutParameters(params);
                node.last_execution = funcTime;
            }
        },
        addErrParameters: (params) => {
            if (!end_date) {
                if (!params.length)
                    node.addErrParameters([params]);
                else
                    node.addErrParameters(params);
                node.last_execution = Date.now();
            }
        },
        addErrParametersFuture: (params, funcTime) => {
            if (!end_date || (end_date && node.last_execution && funcTime <= node.last_execution)) {
                if (!params.length)
                    node.addErrParameters([params]);
                else
                    node.addErrParameters(params);
                node.last_execution = funcTime;
            }
        },
        endInError: () => {
            if (!end_date) {
                node.setAsError();
                node.last_execution = Date.now();
            }
        },
        endCycle: () => {
            if (!end_date) {
                node.status = PIPELINE_STATUS.STARTED;
                node.last_execution = Date.now();
            }
        },
        forceSaving: () => {
            if (!end_date) {
                node.status = PIPELINE_STATUS.STARTED;
                node.saveNode();
                node.last_execution = Date.now();
            }
        },
        forceSavingFuture: (funcTime) => {
            if (!end_date || (end_date && node.last_execution && funcTime <= node.last_execution)) {
                node.saveNode();
                node.last_execution = funcTime;
            }
        },
        endButStarted: () => {
            if (!end_date) {
                node.status = PIPELINE_STATUS.STARTED;
                node.setAsEndButStarted();
                node.last_execution = Date.now();
            }
        },
        endInErrorFuture: (funcTime) => {
            if (!end_date || (end_date && node.last_execution && funcTime <= node.last_execution)) {
                node.setAsError();
                node.last_execution = funcTime;
            }
        },
        endInSuccess: () => {
            if (!end_date) {
                node.setAsSuccess();
                node.last_execution = Date.now();
            }
        },
        endInSuccessFuture: (funcTime) => {
            if (!end_date || (end_date && node.last_execution && funcTime <= node.last_execution)) {
                node.setAsSuccess();
                node.last_execution = funcTime;
            }
        },
        getInParams: () => {
            return node.i_params;
        },
        getParams: () => {
            return node.i_params.concat(node.properties);
        },
        getParam: (name) => {
            return castPropertiesValue(node.getParameter(name));
        },
        getProperty: (name) => {
            return castPropertiesValue(node.getProperty(name));
        },
        getStatus: () => {
            return node.status;
        },
        registerService(name, object) {
            if (node && node.pipe && node.pipe.controller)
                return node.pipe.controller.registerService(node, name, object)
            return false;
        },
        removeService(name) {
            if (node && node.pipe && node.pipe.controller)
                return node.pipe.controller.removeService(node, name)
            return false;
        },
        getService(name) {
            if (node && node.pipe && node.pipe.controller) {
                return node.pipe.controller.getService(node, name)
            } else {
                return null;
            }


        }
    }
}


/**
 * Cast the value to a real type
 * @param {NodeParameter} prop 
 */
function castPropertiesValue(prop) {
    if (!prop)
        return null;
    try {
        let ret = {
            'name': prop.name ? prop.name : '',
            'type': prop.type ? prop.type : '',
            'optional': prop.optional ? prop.optional : false,
            'value': null
        };
        if (prop.nickname)
            ret.nickname = prop.nickname;
        switch (prop.type.toUpperCase()) {
            case 'NUMBER':
                ret.value = Number(prop.value);
                break;
            case 'ARRAY':
                try {
                    if(typeof prop.value === 'string')
                        ret.value = prop.value.split(',');
                    else if(prop.value.length)
                        ret.value = prop.value
                    else ret.value = []
                } catch (err) {
                    ret.value = [];
                }
                break;
            case 'SCAN_PROFILE':
                try {
                    if(typeof prop.value === 'string')
                        ret.value = prop.value.split(',');
                    else if(prop.value.length)
                        ret.value = prop.value
                    else ret.value = []
                } catch (err) {
                    ret.value = [];
                }
                break;
            case 'HASH_OBJECT':
                /**
                 *  {
                 *      par1 : val1,
                 *      par2 : val2
                 *  }
                 */
                if (typeof prop.value === 'string')
                    try {
                        ret.value = JSON.parse(prop.value);
                    } catch (err) { }
                else
                    ret.value = prop.value;
                break;
            case 'JSON_ARRAY':
                if (!prop.value || !(prop.value.length > 0))
                    ret.value = [];
                else if (prop.value && typeof prop.value === 'string')
                    ret.value = prop.value.split(',');
                break;
            case 'DAYS_PICKER':
                try {
                    ret.value = prop.value.split(',');
                    if (ret.value.length === 7) {
                        for (let i = 0; i < 7; i++) {
                            if (ret.value[i] === 'true') {
                                ret.value[i] = true;
                            } else {
                                ret.value[i] = false;
                            }
                        }
                    } else {
                        ret.value = [false, false, false, false, false, false, false];
                    }
                } catch (err) {
                    ret.value = [false, false, false, false, false, false, false];
                }
                break;
            case 'TIME':
                try {
                    let val = prop.value.split(':');
                    ret.value = [0, 0];
                    ret.value[0] = val.length > 0 ? new Number(val[0]) : 0;
                    ret.value[1] = val.length > 1 ? new Number(val[1]) : 0;
                } catch (err) {
                    ret.value = [0, 0];
                }
                break;
            case 'PORT':
                ret.value = Number(prop.value);
                if (ret.value > 65555)
                    ret.value = 65000;
                else if (ret.value < 0)
                    ret.value = 3333;
                break;
            case 'IP':
                ret.value = parseIP(prop.value);
                if (!prop.value)
                    ret.value = '127.0.0.1';
                break;
            case 'OBJECT':
                if (prop.value && typeof prop.value === 'object') {

                } else {
                    if (prop.value && typeof prop.value === 'string') {
                        try {
                            ret.value = JSON.parse(prop.value)
                        } catch (err) { }
                    } else {
                        ret.value = {};
                    }
                }
                break;
            case 'JSON':
                if (prop.value && typeof prop.value === 'object') {
                    ret.value = prop.value;
                } else {
                    if (prop.value && typeof prop.value === 'string') {
                        try {
                            ret.value = JSON.parse(prop.value)
                        } catch (err) { }

                    } else {
                        ret.value = prop.value;
                    }
                }
                break;
            case 'URL':
                try {
                    ret.value = (new URL(prop.value)).href;
                } catch (err) {
                    ret.value = 'localhost';
                }
                break;
            case 'MESSAGE':
                try {
                    vl = JSON.parse(prop.value)
                } catch (err) { }
                ret.value = {
                    name: vl.name ? vl.name.toString() : "",
                    msg: vl.msg ? vl.msg.toString() : ""
                }
                break;
            default:
                ret.value = prop.value;
                break;
        }
        return ret;
    } catch (err) {
        return null;
    }

}
/**
 * Parses a IP address
 * @param {string} ip 
 */
function parseIP(ip) {
    if (ip.match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3})/) != null) {
        ip = ip.match(/(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/);  //clean posible port or http://
        return ip;//ip.split(".");   //returns [a,b,c,d] array
    }
    else
        return false;
}

module.exports = {
    WebWardModule: WebWardModule
}
