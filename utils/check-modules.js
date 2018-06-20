const db = require('../db/index')
const { findModuleInLibrary, removeModuleInLibrary, addModuleToLibrary, getModules } = require('../modules/module_library')
const { loadModulesFromURL } = require('../modules/loader')
const { removeTemplate } = require('../modules/register_template')



async function checkModules() {
    try {
        let dbRES = await db.query(`
            SELECT * FROM ww_modules
        `, []);
        /**
         * @type {[{}]}
         */
        let modsDB = dbRES.rowCount > 0 ? dbRES.rows : [];
        let actualMods = getModules();
        for (let i = 0; i < modsDB.length; i++) {
            let found = false;
            for (let j = 0; j < actualMods.length; j++) {
                if (modsDB[i].name == actualMods[j].tag) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                try {
                    console.log("Loading: " + modsDB[i].origin.toString())
                    await loadModulesFromURL(modsDB[i].origin.toString())
                } catch (err) {}
            }
        }
        for (let i = 0; i < actualMods.length; i++) {
            let found = false;
            for (let j = 0; j < modsDB.length; j++) {
                if (modsDB[j].name == actualMods[i].tag) {
                    found = true;
                }
            }
            if (!found) {
                try {
                    //If valid URL then its not local and can be deleted
                    new URL(actualMods[i].origin)
                    console.log("Removing: " + actualMods[i].origin)
                    removeTemplate(actualMods[i].tag)
                    removeModuleInLibrary(actualMods[i].tag);
                } catch (err) {}

            }
        }
    } catch (err) { }
}

/**
 * Periodically checks modules installed that are stored in the DB
 */
exports.moduleWatchdog = () => {
    setInterval(checkModules, 20000);
}