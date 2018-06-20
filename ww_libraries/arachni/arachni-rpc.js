const fs = require('fs')
const path = require('path')
const { exec, spawn } = require('child_process');
const util = require('util')
const EventEmitter = require('events')
const os = require('os')
const { ArachniScanOptions } = require('./arachni-scan-options')

/**
 * Interface to communicate with a simple ruby script that sends commands across a RPC connection to a ArachniGrid.
 */
class ArachniRPC {
    /**
     * 
     * @param {string} host Dispatcher URL
     * @param {number} port Dispatcher port
     * @param {string} owner Owner of the instance
     */
    constructor(host, port, owner, token = null, url = "") {
        /**
         * Dispatcher Host
         * @type {string}
         */
        this.host = host;
        this.token = token;
        this.url = null;
        this.instanceURL = url;
        /**
         * Dispatcher port
         * @type {number}
         */
        this.port = port;
        /**
         * Owner of the instance
         * @type {string}
         */
        this.owner = owner;
        /**
         * Scaner started?
         * @type {boolean}
         */
        this.scan = false;
        /**
         * Interface to communicate with the process that executes the Ruby RPC Script
         * @type {child_process}
         */
        this.rpc = null;
        let startOpts = [path.join(__dirname, "../../arachni_rpc/index.rb").toString(), host, port, owner];
        if (token && typeof token === 'string') {
            startOpts.push(token);
            startOpts.push(url);
        }
        this.rpc = spawn('ruby', startOpts, {
            stdio: ['pipe', 'pipe', 'pipe'],
            shell: true
        });
        /**
         * Stores information about the instance connection:
         * @type {{token : string,pid : number, url: "host:port",owner : string, birthdate : Date, startime : Date, helpers : {}}}
         * 
         * Example:
         * 
         * {
         * 
         *      token : "c384d09c8ce431b8ebfac5a48a06890e",
         *      pid : 12552,
         *      port : 33223,
         *      url : "127.0.0.1:33223",
         *      owner : "El",
         *      birthdate : 2018-05-03 13:10:58 +0200,
         *      starttime : 2018-05-03 13:12:41 +0200,
         *      helpers :{}
         * }
         */
        this.grid_info = null;
        /**
         * To know when the process is available, has an error or ended
         */
        this.notifier = new EventEmitter();
        /**
         * The process has started
         */
        this.started = false;
        this.alive = false;
        this.busy = false;
        //Configure child process IO to use UTF8
        this.rpc.stdout.setEncoding('utf8');
        this.rpc.stdin.setEncoding('utf8');
        this.report = {};
        this.rpc.stdout.on('data', (chunk) => {
            if (!this.grid_info) {
                //No grid info so its the first data sended by the process 
                this.grid_info = JSON.parse(chunk)
                this.started = true;
                this.notifier.emit('started');
            }
        });

        this.rpc.stdout.on('error', () => {
            this.notifier.emit('error')
        })
        this.rpc.stdout.on('end', (chunk) => {
            this.notifier.emit('end');
        });

        this.scan_options = new ArachniScanOptions();

        //Anti-Zombie system

        process.once('exit', () => {
            try {
                this.rpc.stdin.write('exit' + os.EOL);
            } catch (err) { }
        })
    }
    /**
     * Waits for initialization of the instance
     */
    async waitStarted() {
        return new Promise((resolve, reject) => {
            if (this.started) {
                resolve(true)
            } else {
                this.notifier.once('started', () => {
                    resolve(true);
                });
            }
        });
    }
    /**
     * Kills the instance safely
     */
    async exit() {
        return new Promise((resolve, reject) => {
            this.rpc.stdin.write('exit' + os.EOL, () => {
                resolve(true)
            })
        });
    }
    /**
     * Is the instance alive?
     */
    async isAlive() {
        this.rpc.stdin.write('alive' + os.EOL);
        let timProm = new Promise((res, rej) => {
            setTimeout(rej, 10000,'Alive timeout expired');
        })
        let promb = new Promise((res, rej) => {
            this.rpc.stdout.once('data', (data) => {
                data = data.toString().trim();
                if ((typeof data == 'boolean' && data) || data == "true") {
                    resolve(true)
                } else {
                    resolve(false)
                }
            });
        })
        return Promise.race([timProm, promb])
    }
    /**
     * Is the instance busy doing a scan?
     */
    async isBusy() {
        return new Promise((resolve, reject) => {
            this.rpc.stdin.write('busy' + os.EOL);
            this.rpc.stdout.once('data', (data) => {
                data = data.toString().trim();
                if ((typeof data == 'boolean' && data) || data == "true") {
                    resolve(true)
                } else {
                    resolve(false)
                }
            });
        });

    }
    /**
     * Sets the Arachni scan options.
     * @param {ArachniScanOptions} opts 
     */
    setScanOptions(opts) {
        this.scan_options = opts;
    }
    /**
     * Starts a scan against a url.
     * The scan uses the parameters of this instance (this.scan_options)
     * @param {URL | string} url 
     */
    async startScan(url) {
        if (this.scan)
            return true;
        try {
            //Initiate scan properties
            let read = await new Promise((resolve, reject) => {
                this.rpc.stdin.write('scan' + os.EOL, () => {
                    this.rpc.stdout.once('data', (chunk) => {
                        chunk = chunk.toString().trim();
                        resolve(chunk)
                    })
                })
            })
            this.url = url;
            let prop = {
                url: url,
                authorized_by: process.title
            }
            /**
             * Passs options to arachni
             */
            if (this.scan_options)
                prop.checks = this.scan_options.checks;
            if (this.scan_options.audit)
                prop.audit = this.scan_options.audit;
            if (this.scan_options.http)
                prop.http = this.scan_options.http;
            if (this.scan_options.scope)
                prop.scope = this.scan_options.scope;
            if (this.scan_options.login)
                prop.login = this.scan_options.login;
            if (this.scan_options.plugins)
                prop.plugins = this.scan_options.plugins;
            if (this.scan_options.platforms)
                prop.platforms = this.scan_options.platforms;
            if (this.scan_options.no_fingerprinting)
                prop.no_fingerprinting = this.scan_options.no_fingerprinting;
            if (this.scan_options.grid)
                prop.grid = this.scan_options.grid;
            if (this.scan_options.grid_mode)
                prop.grid_mode = this.scan_options.grid_mode;
            if (this.scan_options.spawns)
                prop.spawns = this.scan_options.spawns;
            read = await new Promise((resolve, reject) => {
                this.rpc.stdin.write(JSON.stringify(prop) + os.EOL, () => {
                    this.rpc.stdout.once('data', (chunk) => {
                        chunk = chunk.toString().trim();
                        resolve(chunk)
                    })
                })
            })
            if (read === 'true') {
                this.scan = true;
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }

    }
    async getReport() {
        return new Promise((resolve, reject) => {
            this.rpc.stdin.write('report' + os.EOL);
            this.rpc.stdout.once('data', (data) => {
                let report = JSON.parse(data.toString().trim())
                this.report = report;
                resolve(report)
            });
        });

    }
    /**
     * Update the checks list
     * @param {string[]} checks 
     */
    setChecks(checks) {
        this.checks = checks;
    }
    setGrid(grid) {
        this.grid = grid;
    }
    setGridMode(gm) {
        this.grid_mode = gm;
    }
    setSpawns(sp) {
        this.spawns = sp;
    }
    getStatus() {
        return this.rpc.connected;
    }

}
exports.ArachniRPC = ArachniRPC;