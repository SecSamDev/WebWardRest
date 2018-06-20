const { PipelineNode } = require('./pipeline')
class PipelineService {
    /**
     * 
     * @param {string} name 
     * @param {PipelineNode} node 
     */
    constructor(name, node,objeto = null) {
        this.name = name;
        this.node = node;
        this.objeto = objeto;
    }
    getObject() {
        return this.objeto;
    }
    /**
     * Stores some object to use it later like a SSH connection
     * @param {} object 
     */
    setObject(object) {
        this.objeto = object;
    }
}

exports.PipelineService = PipelineService;