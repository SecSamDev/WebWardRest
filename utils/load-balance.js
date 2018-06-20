const cluster = require('cluster');
const os = require('os');
const {EventEmitter} = require('events')
/**
 * Simple Load balancing system for NodeJS. The workers store information about CPU usage and send it to master.
 */
const WD_TIMEOUT = 700;

class CircularBuffer {
    constructor(n) {
        /**
         * @type {number[]}
         */
        this._array = new Array(n);
        this.pos = 0;
        this.length = n;
    }
    get(i = this.pos) {
        return this._array[i % this.length];
    }
    set(v, i = this.pos) {
        if (i < 0 || i > this.length)
            return;
        this._array[i] = v;
        this.pos++;
        if (this.pos >= this.length)
            this.pos = 0;
    }
    toString() {
        return '[object CircularBuffer(' + this.length + ')]';
    }
}

function setUpWatchdog() {
    notifier.on('statistcs',()=>{
        sendStatistics();
    })
}

/**
 * Use a event listener to get notifications for statistics and configurate
 */
const notifier = new EventEmitter();

function setLoadBalancer(cb = null) {
    if (cluster.isMaster) {
        process.on('message', (msg) => {
            if (cb && msg.reason && msg.reason === 'STATICS') {
                cb(msg.reqS, msg.resT, msg.tPipe, msg.usage, msg.mem);
            }
        });
    } else {
        notifier.once('statistics',setUpWatchdog);
    }
}

/**
 * Send information to the father
 */
function sendStatistics() {
    process.send({
        reason: 'STATICS',
        reqS: getReqPerSec(),
        resT: getResTiming(),
        tPipe: getPipelineTime(),
        usage: process.cpuUsage().system,
        mem: process.memoryUsage().heapUsed
    });
}

// ---------------------------------------------------------
// | Express JS simple system to calculate and send usage  |
// | information to the master.                            |
// |                                                       |
// ---------------------------------------------------------


let pipelineTime = new CircularBuffer(100);

function getPipelineTime() {
    return (pipelineTime._array.reduce((prev, curr, i, arr) => {
        return prev + curr;
    }) / (pipelineTime.length));
}

/**
 * Notifies of a pipeline that has ended
 * @param {number} tPipe Duration of the pipeline
 */
function pipelineEnd(tPipe) {
    pipelineTime.set(tPipe);
    notifier.emit('statistics')
}



// ---------------------------------------------------------
// | Express JS simple system to calculate and send usage  |
// | information to the master.                            |
// |                                                       |
// ---------------------------------------------------------


let requestsPerSec = new CircularBuffer(100);
let responsePerSec = new CircularBuffer(100);


function getReqPerSec() {
    return (requestsPerSec._array.reduce((prev, curr, i, arr) => {
        if (i > 0) {
            return prev + (1 / (arr[i] - arr[i - 1]));
        } else {
            return 0;
        }
    }) / (requestsPerSec.length - 1));
}

function getResTiming() {
    return (responsePerSec._array.reduce((prev, curr, i, arr) => {
        return prev + curr;
    }) / (responsePerSec.length));
}

/**
 * Pre middleware for API requests. Allow us to save statistics for request time.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function preRequestExpress(req, res, next) {
    req.initRequest = new Date().getTime();
    requestsPerSec.set(req.initRequest);
    next();
}
/**
 * Post middleware for API requests. Allow us to save statistics for response time.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function postRequestExpress(req, res, next) {
    if (req.initRequest) {
        responsePerSec.set(new Date().getTime() - req.initRequest)
    }
    notifier.emit('statistics')
    next();
}



exports.preRequestExpress = preRequestExpress;
exports.postRequestExpress = postRequestExpress;
exports.setLoadBalancer = setLoadBalancer;
exports.pipelineEnd = pipelineEnd;