const util = require('util');
process.pipe_node_templates = [];

function registerTemplate(template) {
    if(!process.pipe_node_templates.find((val,i,arr)=>{
        if(val.tag === template.tag)
            return true;
        else
            return false;
    })){
        process.pipe_node_templates.push(castToTemplate(template))
    }
}

function castToTemplate(template) {
    let temp = {};
    let inp = false;
    let out = false;
    let err = false;
    if (template.tag && typeof template.tag === 'string')
        temp.tag = template.tag;
    else
        throw new Error("No valid NAME")
    if (template.name && typeof template.name === 'string')
        temp.name = template.name;
    else
        throw new Error("No valid TAG")
    if (template.type && typeof template.type === 'string')
        temp.type = template.type;
    else
        throw new Error("No valid TYPE")
    if (util.isArray(template.inputConnectors) && !inp){
        temp.inputConnectors = template.inputConnectors;
        inp = true;
    }
    if (util.isArray(template.inputParams) && inp)
        temp.inputParams = template.inputParams;
    if (util.isArray(template.outputConnectors) && !out){
        temp.outputConnectors = template.outputConnectors;
        out = true;
    }
    if (util.isArray(template.outputParams) && out)
        temp.outputParams = template.outputParams;
    if (util.isArray(template.errorConnectors) && !err){
        temp.errorConnectors = template.errorConnectors;
        err = true;
    }
    if (util.isArray(template.errorParams) && err)
        temp.errorParams = template.errorParams;
    if(!inp && !out && !err){
        throw new Error("No connectors available")
    }
    if (util.isArray(template.properties))
        temp.properties = template.properties;
    return temp;
}   
function removeTemplate(tagName){
    process.pipe_node_templates.filter((val,i,arr)=>{
        if(val.tag === tagName)
            return false;
        return true;
    })
}

exports.registerTemplate = registerTemplate;
exports.removeTemplate = removeTemplate;