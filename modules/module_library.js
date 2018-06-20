const { WebWardModule } = require('./ww_module')
const cluster = require('cluster');
/** 
 * @type {WebWardModule[]}
*/
const modules = [];

/**
 * Adds a WebWardModule to the library
 * @param {WebWardModule} mod 
 */
function addModuleToLibrary(mod) {
    for (let i = 0; i < modules.length; i++) {
        if (modules[i].tag === mod.tag) {
            modules[i] = mod;
            return false;
        }
    }
    modules.push(mod)
    return true;
}
/**
 * Finds a WebWardModule in the library
 * @param {string} tag
 * @returns {WebWardModule} 
 */
function findModuleInLibrary(tag) {
    for (let i = 0; i < modules.length; i++) {
        if (modules[i].tag === tag) {
            return modules[i];
        }
    }
    return null;
}
/**
 * Finds a WebWardModule in the library
 * @param {string} tag
 */
function removeModuleInLibrary(tag) {
    for (let i = 0; i < modules.length; i++) {
        if (modules[i].tag === tag) {
            modules.splice(i, 1);
            return true;
        }
    }
    return false;
}
function getModules(){
    return modules;
}


exports.findModuleInLibrary = findModuleInLibrary;
exports.getModules = getModules;
exports.addModuleToLibrary = addModuleToLibrary;
exports.removeModuleInLibrary = removeModuleInLibrary;