const { WebWardModule } = require('./ww_module')

//Access files
const fs = require('fs');

//STD Out log
const { Console } = require('console')

//HTTP Request
const request = require('request');

//Arachni REST
const { ArachniAPI } = require('../ww_libraries/arachni/arachni-REST')

//Security scan Using RPC. Pre-Alpha version. Discouraged Use
const arachniWrapper = require('../ww_libraries/arachni/arachni-wrapper')
//Telegram bot
const { TelegramBot } = require('../ww_libraries/telegram-notifier/telegram-bot')
//Store reports
const reportStore = require('../ww_libraries/report-store/report-store')
//Extract plugin data, frameworks, SO versions, platform versions
const wappalyzer = require('../ww_libraries/wappalyzer/wappalyzer-wraper')

const projInfo = require('../ww_libraries/project-info/project-info')

/**
 * @type {Console}
 */
var pipeConsole;
var allowedLibraries = [];
var injectedLibraries = [];
/**
 * Simple Module Loader with require.
 * @param {WebWardModule} mod
 */
function handleRequire(mod) {
    return function (modName) {
        if (mod.requires.find((val) => {
            if (val === modName) {
                return true;
            } else {
                return false;
            }
        })) {
            //Improve logic to check if tries to leave directory--------------------TODO
            var auxMod = require(modName);
            return auxMod;
        } else {
            return null;
        }
    }
}
/**
 * Prepares a sanbox with all the libraries required. 
 * The library 'require' is special because we need to check
 * if the required library is enabled
 * @param {WebWardModule} mod
 * @param {PipelineNode} node
 */
function prepareSandBox(mod, node = null) {
    if (!pipeConsole) {
        pipeConsole = new Console(
            fs.createWriteStream('./' + process.title + '-sandbox-stdout.log'),
            fs.createWriteStream('./' + process.title + '-sandbox-stderr.log')
        );
    }
    let sandbox = {};
    if (mod.requires.length > 0) {
        sandbox['require'] = handleRequire(mod);
    }
    for (let i = 0; i < mod.libraries.length; i++) {
        let library;
        if ((library = allowedLibraries.find((val, p, arr) => {
            if (val.name === mod.libraries[i])
                return true;
            return false;
        }))) {
            sandbox[library.fun_name] = library.fun;
        }
    }
    if(node && mod.injectors.length > 0){
    for (let i = 0; i < mod.injectors.length; i++) {
            let library;
            if ((library = injectedLibraries.find((val, p, arr) => {
                if (val.name === mod.injectors[i])
                    return true;
                return false;
            }))) {
                sandbox[library.fun_name] = library.inject(node);
            }
        }
    }
    return sandbox;
}

injectedLibraries.push({
    'name': 'report_store',
    'fun_name': 'storeReport',
    'inject': reportStore.generateInjectionFunction
})
injectedLibraries.push({
    'name': 'project_info',
    'fun_name': 'projectInfo',
    'inject': projInfo.generateInjectionFunction
})

allowedLibraries.push({
    'name': 'console',
    'fun_name': 'console',
    'fun': {
        log: (data) => {
            if (typeof data === 'string') {
                pipeConsole.log(data)
            } else {
                pipeConsole.log(JSON.stringify(data));
            }
        },
        error: (data) => {
            if (typeof data === 'string') {
                pipeConsole.error(data)
            } else {
                pipeConsole.error(JSON.stringify(data));
            }
        },
    }
})
allowedLibraries.push({
    'name': 'wappalyzer',
    'fun_name': 'wappalyzer',
    'fun': wappalyzer
})

allowedLibraries.push({
    'name': 'timeout',
    'fun_name': 'setTimeout',
    'fun': (func, time) => {
        let newTimer = setTimeout(() => {
            try {
                func()
            } catch (err) { }
        }, time)
        addTimeoutToList(newTimer);
    }
})
allowedLibraries.push({
    'name': 'request',
    'fun_name': 'request',
    'fun': request
})
allowedLibraries.push({
    'name': 'arachniREST',
    'fun_name': 'arachniREST',
    'fun': ArachniAPI
})
allowedLibraries.push({
    'name': 'arachnirpc',
    'fun_name': 'arachniRPC',
    'fun': arachniWrapper
})
allowedLibraries.push({
    'name': 'arachni',
    'fun_name': 'arachni',
    'fun': arachniWrapper
})

allowedLibraries.push({
    'name': 'telegram',
    'fun_name': 'TelegramBot',
    'fun': TelegramBot
})

var timer_list = [];
/**
 * Protect from infinite timer in memory
 * @param {number} newTimer 
 */
function addTimeoutToList(newTimer) {
    try {
        let startTime = Date.now() - 30000;
        let timer_list = timer_list.filter((val, pos, arr) => {
            if (val.started < startTime) {
                clearTimeout(val.timer);
                return false;
            }
            return true;
        })
    } catch (err) { }
    timer_list.push({ 'timer': newTimer, 'started': Date.now() })
}


exports.prepareSandBox = prepareSandBox;