const { WebWardModule } = require('./ww_module')
const { Script } = require('vm');
const util = require('util');
const vm = require('vm');
const zlib = require('zlib');
const StreamZip = require('node-stream-zip');
const fs = require('fs');
const path = require('path')
const { URL } = require("url");
const url = require("url");
const request = require('request')

const library = require('./module_library')
const register_template = require('./register_template')



const moduleFolder = process.env.WW_MODULES ? process.env.WW_MODULES : path.join(__dirname, 'WW_MODULES');
const codeTimeout = process.env.WW_MODULES_TIMEOUT ? process.env.WW_MODULES_TIMEOUT : 3000;

exports.scriptFromFile = scriptFromFile;
exports.loadModulesFromDirectory = loadModulesFromDirectory;
exports.loadModulesFromURL = loadModulesFromURL;
exports.checkModuleInURL = checkModuleInURL;
exports.getModuleFromDirectory = getModuleFromDirectory;

/**
 * Loads all WebWardModules from a directory.
 * @param {string | path} dir Directory in the system
 * @param {string} moduleOrigin Optional origin. Default: "" that means local 
 */
async function loadModulesFromDirectory(dir = moduleFolder, moduleOrigin = "") {
    let folder;
    if (path.isAbsolute(dir)) {
        folder = dir;
    } else if (util.isString(dir)) {
        folder = path.join(__dirname, dir)
    }
    try {
        let files = await util.promisify(fs.readdir)(folder)
        let mod;
        for (let i = 0; i < files.length; i++) {
            let val = files[i];
            try {
                let modulePath = path.join(folder, val);
                let stats = await util.promisify(fs.lstat)(modulePath)
                if (stats.isDirectory()) {//Is a directory
                    //Search for wwmodule.json inside directory
                    let wwmodule = JSON.parse(await util.promisify(fs.readFile)(path.join(modulePath, "wwmodule.json")))

                    if (wwmodule.submodules && wwmodule.submodules.length > 0) {
                        for (let i = 0; i < wwmodule.submodules.length; i++) {
                            try {

                                //Load submodules
                                let submod = wwmodule.submodules[i];
                                if (!(typeof submod.script === 'string' && submod.script.length > 3))
                                    throw new Error(`Not valid subscript ${submod.script} in: ${modulePath}`)
                                if (!(submod.tag && typeof submod.tag === 'string'))
                                    throw new Error("No valid tag")
                                if (!(submod.template))
                                    throw new Error("No valid Template")
                                //Origin="" means local
                                let scr = await scriptFromFile(path.join(modulePath, submod.script))
                                mod = new WebWardModule(moduleOrigin, submod.tag, scr, submod.requires, submod.libraries,submod.injectors);
                                library.addModuleToLibrary(mod)

                                register_template.registerTemplate(submod.template);
                            } catch (err) {
                            }
                        }
                    }
                }
            } catch (err) {
            }
        }
        return mod;
    } catch (err) {
        throw new Error(`
        Can\`t load modules from directory: ${folder}
        Set a valid module folder in the "WW_MODULES" Environment Variable.
        `)
    }
}
/**
 * Only obtain a module from a directory. It doesnt load anything.
 * @param {string | path} dir Directory in the system
 * @param {string} moduleOrigin Optional origin. Default: "" that means local 
 */
async function getModuleFromDirectory(dir = moduleFolder, moduleOrigin = "", modName = null) {
    let folder;
    if (path.isAbsolute(dir)) {
        folder = dir;
    } else if (util.isString(dir)) {
        folder = path.join(__dirname, dir)
    }

    try {
        try {
            let wwmodule = JSON.parse(await util.promisify(fs.readFile)(path.join(folder, "wwmodule.json")))
            if (wwmodule.submodules && wwmodule.submodules.length > 0) {
                for (let i = 0; i < wwmodule.submodules.length; i++) {
                    try {

                        //Load submodules
                        let submod = wwmodule.submodules[i];
                        if (!(typeof submod.script === 'string' && submod.script.length > 3))
                            throw new Error(`Not valid subscript ${submod.script} in: ${folder}`)
                        if (!(submod.tag && typeof submod.tag === 'string'))
                            throw new Error("No valid tag")
                        if (!(submod.template))
                            throw new Error("No valid Template")
                        let scr = await scriptFromFile(path.join(folder, submod.script))
                        if (modName) {
                            if (modName === submod.tag) {
                                return {
                                    mod: new WebWardModule(moduleOrigin, submod.tag, scr, submod.requires, submod.libraries,submod.injectors),
                                    template: submod.template
                                }
                            }
                        } else {
                            return {
                                mod: new WebWardModule(moduleOrigin, submod.tag, scr, submod.requires, submod.libraries,submod.injectors),
                                template: submod.template
                            }
                        }
                    } catch (err) {
                        throw err;
                    }
                }
            }
        } catch (err) {
        }
    } catch (err) {
        throw new Error(`
        Can\`t load modules from directory: ${folder}
        Set a valid module folder in the "WW_MODULES" Environment Variable.
        `)
    }
}

/**
 * Loads only one module from a directory
 * @param {*} dir 
 * @param {*} moduleOrigin 
 */
async function loadOneModuleFromDirectory(dir = moduleFolder, moduleOrigin = "") {
    let folder;
    if (path.isAbsolute(dir)) {
        folder = dir;
    } else if (util.isString(dir)) {
        folder = path.join(__dirname, dir)
    }

    try {
        try {
            let wwmodule = JSON.parse(await util.promisify(fs.readFile)(path.join(folder, "wwmodule.json")))
            let lastMod = null;
            if (wwmodule.submodules && wwmodule.submodules.length > 0) {
                for (let i = 0; i < wwmodule.submodules.length; i++) {
                    try {
                        //Load submodules
                        let submod = wwmodule.submodules[i];
                        if (!(typeof submod.script === 'string' && submod.script.length > 3))
                            throw new Error(`Not valid subscript ${submod.script} in: ${folder}`)
                        if (!(submod.tag && typeof submod.tag === 'string'))
                            throw new Error("No valid tag")
                        if (!(submod.template))
                            throw new Error("No valid Template")
                        let mod = new WebWardModule(moduleOrigin, submod.tag, null, submod.requires, submod.libraries,submod.injectors);
                        library.addModuleToLibrary(mod)
                        register_template.registerTemplate(submod.template);
                        lastMod = mod;
                    } catch (err) {
                        throw err;
                    }
                }
            }
            return lastMod;
        } catch (err) {
        }
    } catch (err) {
        throw new Error(`
        Can\`t load modules from directory: ${folder}
        Set a valid module folder in the "WW_MODULES" Environment Variable.
        `)
    }
}

/**
 * Loads a new module or modules from a URL
 * @param {URL | string} origin 
 */
async function loadModulesFromURL(origin) {
    try {
        //If not valid then throws a error
        origin = origin.toString();
        new URL(origin)

        let subpath = path.basename(url.parse(origin.toString()).pathname);
        let fileName = (subpath.split('.'))[0];
        let tmpMod = path.join(__dirname, 'tmp');
        try {
            fs.mkdirSync(tmpMod)
        } catch (err) { }
        let zipPath = await downloadZIP(origin, tmpMod, fileName)
        let pathFile = await extractZIP(zipPath, fileName)
        return await loadOneModuleFromDirectory(pathFile, origin)
    } catch (err) {
        console.error(err)
        throw new Error(`Can\`t load modules from URL: ${origin}`)
    }
}

/**
 * Check if a URL module is Valid
 * @param {string | path} dir Directory in the system
 * @param {string} moduleOrigin Optional origin. Default: "" that means local 
 */
async function isValidModule(dir = moduleFolder, moduleOrigin = "") {
    let folder;
    if (path.isAbsolute(dir)) {
        folder = dir;
    } else if (util.isString(dir)) {
        folder = path.join(__dirname, dir)
    }
    try {
        let files = await util.promisify(fs.readdir)(folder)
        for (let i = 0; i < files.length; i++) {
            let val = files[i];
            try {
                let wwmodule = JSON.parse(await util.promisify(fs.readFile)(path.join(folder, "wwmodule.json")))

                if (wwmodule.submodules && wwmodule.submodules.length > 0) {
                    for (let i = 0; i < wwmodule.submodules.length; i++) {
                        try {

                            //Load submodules
                            let submod = wwmodule.submodules[i];
                            if (!(typeof submod.script === 'string' && submod.script.length > 3))
                                throw new Error(`Not valid subscript ${submod.script} in: ${folder}`)
                            if (!(submod.tag && typeof submod.tag === 'string'))
                                throw new Error("No valid tag")
                            if (!(submod.template))
                                throw new Error("No valid Template")
                            let mod = new WebWardModule(moduleOrigin, submod.tag, null, submod.requires, submod.libraries,submod.injectors);
                            return mod;
                        } catch (err) {
                            throw err;
                        }
                    }
                }
            } catch (err) {
                console.error(err)
            }
        }
    } catch (err) {
        throw new Error(`
        Can\`t load modules from directory: ${folder}
        Set a valid module folder in the "WW_MODULES" Environment Variable.
        `)
    }
}


/**
 * Loads a new module or modules from a URL
 * @param {URL | string} origin 
 */
async function checkModuleInURL(origin) {
    try {
        //If not valid then throws a error
        new URL(origin)

        let subpath = path.basename(url.parse(origin.toString()).pathname);
        let fileName = (subpath.split('.'))[0];
        let tmpMod = path.join(__dirname, 'tmp');
        try {
            fs.mkdirSync(tmpMod)
        } catch (err) { }
        let zipPath = await downloadZIP(origin, tmpMod, fileName)
        let pathFile = await extractZIP(zipPath, fileName)
        return await isValidModule(pathFile, origin)
    } catch (err) {
        throw new Error(`Can\`t load modules from URL: ${origin}`)
    }
}

/**
 * Loads scripts that has the logic of the WebWardModule
 * @param {string} path 
 * @returns {Promise<Script>}
 */
async function scriptFromFile(path) {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(path, { encoding: 'utf8' }, (err, code) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(new Script(code, { timeout: codeTimeout }))
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}

async function downloadZIP(url, filePath, fileName) {
    if (url.href)
        url = url.href
    let zipPath = path.join(filePath, fileName + ".zip");
    return new Promise((resolve, reject) => {
        try {
            request(url).on('error', (err) => {
                reject(err);
            }).pipe(fs.createWriteStream(zipPath)).on('close', () => {
                resolve(zipPath);
            })
        } catch (err) {
            reject(err)
        }
    })
}
async function extractZIP(zipPath, fileName) {
    let pathToExtract = path.dirname(zipPath)
    return new Promise((resolve, reject) => {
        const zip = new StreamZip({
            file: zipPath,
            storeEntries: true
        });
        // Handle errors
        zip.on('error', err => {
            reject(err)
        });
        zip.on('ready', () => {
            let extractPath = path.join(pathToExtract, 'tmp-' + fileName)
            try {
                fs.mkdirSync(extractPath);
            } catch (err) { }
            zip.extract(null, extractPath, (err, count) => {
                resolve(extractPath)
                zip.close();
            });
        });
    })
}
/**
 * TODO: fix it
 * @param {URL} url 
 * @param {*} pathToExtracted 
 */
async function downloadAndExtractZIP(url, pathToExtracted) {
    if (url.href)
        url = url.href
    let outPath = util.promisify(fs.mkdir)
    await outPath(pathToExtracted)
    let out = fs.createWriteStream(pathToExtracted);
    return new Promise((resolve, reject) => {
        request(url).on('error', (err) => {
            reject(err);
        }).pipe(zlib.createGzip()).on('error', (err) => {
            reject(err)
        }).pipe(out).on('close', () => {
            resolve();
        })
    })
}



