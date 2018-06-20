
var myURL = node.getParam('_SCAN_URL');
var userAgent = node.getParam('_USER_AGENT');
var maxURLs = node.getParam('_MAX_URL');
var maxDepth = node.getParam('_MAX_DEPTH');
var maxTime = node.getParam('_MAX_TIME');
var started = node.getParam('_STARTED');
var retries = node.getParam('RETRIES');
var report = node.getParam('_REPORT');
//The service for storing WAPPALYZER
var scanService = node.getService('WAPPALYZER');

if (!myURL || !myURL.value || myURL.value === '') {
    endError("No valid SCAN URL")
} else {
    var saveTime = Date.now();
    if (scanService) {//Exists Scan Service-------------------------------------------
        console.log("Exists scan service")
        //Now get Scan Rpoert
        if (report && report.value) {
            //Report in variable, end Scan process
            try {
                endScan(report.value, saveTime);
            } catch (err) {
                processError(err, saveTime)
            }
        } else {
            try {
                if (started && started.value) {
                    //600000mil = 600 Secs = 10 min max scan by default
                    if ((saveTime - started.value) > (maxTime && maxTime.value ? maxTime.value : 600000)) {
                        endError("Scan Timeout Expired")
                        throw Error("Scan timeout")
                    }
                }
                console.log("GET RESPONSE?")
                var resp = scanService.getResponse();
                //We have the scan, store it and next iteration
                console.log(resp)
                analizeReport(resp)
                node.endCycle()
            } catch (err) {
                console.log(err)
                //This error is because we dont have a response
                console.log("ERROR")
            }
        }

    } else {//--NO SERVICE
        try {
            //Launch a new instance
            var scan = wappalyzer(myURL.value, {
                debug: false,
                delay: 500,
                maxDepth: maxDepth && maxDepth.value ? maxDepth.value : 3,
                maxUrls: maxURLs && maxURLs.value ? maxURLs.value : 10,
                maxWait: 5000,
                recursive: true,
                userAgent: userAgent && userAgent.value ? userAgent.value : 'WEBWARDv1.0',
                htmlMaxCols: 2000,
                htmlMaxRows: 2000,
            });
            var asdas = node.registerService('WAPPALYZER', scan);
            console.log("Registrado servicio?" + asdas)
            node.removeProperty('RETRIES')
            node.removeProperty('_REPORT')
            node.addProperty({
                "nickname": "Started Scan",
                "name": "_STARTED",
                "type": "NUMBER",
                "value": saveTime,
                "optional": false
            });
            //Start analyze
            scan.analyze();
            node.endCycle()
            //Next iteration we will try launching a scan
        } catch (err) {
            endError(((err && err.message) ? err.message : "Error launching wappalyzer instance"))
        }

    }
}
function analizeReport(resp, saveTime) {
    console.log("Analize report")
    if (storeReport) {
        //If library available store report
        storeReport(resp, 'WAPPALYZER').then(() => { }).catch(err => { });
    }
    node.addPropertyFuture({
        "nickname": "Report",
        "name": "_REPORT",
        "type": "JSON",
        "value": resp,
        "optional": false
    }, saveTime);
    node.forceSavingFuture(saveTime);
    try {
        //Try to set project info. 
        projectInfo(resp.applications.reduce((total, val, i, arr) => {
            total[val.name] = val.version;
            return total;
        }, {}), 'platform');
    } catch (err) { }
}
function endScan(report, saveTime) {
    try {
        console.log("Report")
        console.log(report)
        node.addOutParametersFuture({
            "nickname": "Report",
            "name": "_REPORT",
            "type": "JSON",
            "value": report,
            "optional": false
        }, saveTime);
        node.removeProperty('RETRIES')
        node.removeProperty('_REPORT')
        node.removeProperty('_STARTED')
        try {
            node.removeService('WAPPALYZER')
        } catch (Err) { }
        node.endInSuccessFuture(saveTime)
    } catch (err) {
        processError(err)
    }
}

function endError(msg, saveTime) {
    console.log(msg)
    if (saveTime) {
        node.addErrParametersFuture({
            "nickname": "Error",
            "name": "_ERROR",
            "type": "ERROR",
            "value": msg
        }, saveTime);
        node.removeService('WAPPALYZER')
        node.removePropertyFuture('RETRIES', saveTime)
        node.removePropertyFuture('_REPORT', saveTime)
        node.endInErrorFuture(saveTime);
    } else {
        node.addErrParameters({
            "nickname": "Error",
            "name": "_ERROR",
            "type": "ERROR",
            "value": msg
        });
        node.removeService('WAPPALYZER')
        node.removeProperty('RETRIES')
        node.removeProperty('_REPORT')
        node.endInError();
    }

}

function processError(err, saveTime) {
    if (retries && retries.value > 0) {
        retries.value--;
        node.addPropertyFuture(retries, saveTime);
    } else if (retries && retries.value <= 0) {
        //No more retries...end in error
        endError("Max error retries getting scan progress", saveTime)
    } else {
        //Set maximum number of errors
        node.addPropertyFuture({
            "nickname": "Retries?",
            "name": "RETRIES",
            "type": "NUMBER",
            "value": 5,
            "optional": false
        }, saveTime);
    }
}