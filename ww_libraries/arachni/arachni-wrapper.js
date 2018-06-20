const { ArachniRPC } = require("./arachni-rpc");
const db = require('../../db/index')
/**
 * This acts as a proxy to communicate with the real ARACHNI library
 * 
 */
function createArachniRPC(token = null, url = null) {
    var envVar = process.env['ARACHNI_URL']
    if (!envVar || envVar == '') {
        throw new Error("No ARACHNI instances available")
    }
    var arachni = new ArachniRPC(envVar, process.env['ARACHNI_PORT'] || 7331, process.title, token, url);
    return {
        isAlive: arachni.isAlive.bind(arachni),
        isBusy: arachni.isBusy.bind(arachni),
        startScan: async function (scanURL) {
            let achieved = false;
            try {
                achieved = await arachni.startScan(scanURL);
            } catch (err) {
                arachni.scan = false;
            }
            try {
                if (achieved)
                    await storeScan(arachni)
                //Store the scan to avoid zombie process
            } catch (err) {
                await arachni.exit()
            }
            return arachni.scan;
        },
        exit: async function () {
            await arachni.exit()
        },
        getReport: async function () {
            return arachni.getReport();
        },
        setOptions: async function (opts) {
            return arachni.setScanOptions(opts)
        },
        getOptions: async function () {
            return arachni.scan_options;
        },
        getToken: function () {
            return arachni.token;
        },
        getInstanceURL: function () {
            return arachni.instanceURL;
        },
        setChecks: function (checkList) {
            arachni.scan_options.checks = checkList;
        },
        getChecks: function () {
            return arachni.scan_options.checks;
        }
    }
    //*/
}
/**
 * 
 * @param {ArachniRPC} arachni 
 */
async function storeScan(arachni, ret = 3) {
    try {
        await db.query(`
        INSERT INTO arachni_scan 
            (token,url) 
        VALUES 
            ($1,$2);
        `, [arachni.grid_info.token, arachni.grid_info.url])
    } catch (err) {
        storeScan(arachni, ret - 1);
    }
}

module.exports = createArachniRPC;