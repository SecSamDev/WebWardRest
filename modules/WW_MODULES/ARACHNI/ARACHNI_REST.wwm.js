
var myURL = node.getParam('_SCAN_URL');
var scanID = node.getParam('_SCAN_ID');
var status = node.getParam('_STATUS');
var busy = node.getParam('_BUSY');
var token = node.getParam('_INSTANCE_TOKEN');
var instanceURL = node.getParam('_INSTANCE_URL');
var retries = node.getParam('RETRIES');
//The service for storing ARACHNI
var scanService = node.getService('SCANNER');

if (!myURL || !myURL.value || myURL.value === '') {
    endError("No valid SCAN URL")
} else {
    var saveTime = Date.now();
    if (scanService) {//Exists Scan Service-------------------------------------------
        var arachs = scanService;
        if (status && (status.value === 'scanning' || status.value === 'ready' || status.value === 'paused' || status.value === 'pausing' || status.value === 'preparing')) {//ALIVE => Monitor scan progress
            scanService.getProgress((err, resp) => {
                if (err) {
                    processError(err,saveTime)
                } else {
                    analizeProgress(resp,saveTime)
                }
            })
        } else if (status && status.value === 'done') {
            var reportSaved = node.getParam('_REPORT');
            console.log("Previous saved REPORT?")
            console.log(reportSaved)
            if (reportSaved && 'value' in reportSaved) {
                //Stored Report
                endScan(reportSaved, saveTime)
            } else {
                console.log("Get report: " + status.value)
                scanService.getReport((err, resp) => {
                    if (err) {
                        processError(err,saveTime)
                    } else {
                        analizeReport(resp,saveTime)
                    }
                })
            }

        } else if (status && status.value === 'aborted') {
            endError('Scan aborted', saveTime);
        } else if (status && status.value === 'cleanup') {
            endError('Scan cleaned...No report available', saveTime);
        } else {
            console.log("ScanID " + (scanID && scanID.value ? scanID.value : " null"))
            if (scanID && scanID.value != "") {//--NO ALIVE but with a stored scanID
                console.log("Get progress of existing scanID")
                scanService.getProgress((err, resp) => {
                    if (err) {
                        processError(err,saveTime)
                    } else {
                        analizeProgress(resp,saveTime)
                    }
                })
            } else {//--NO ALIVE => Launch scan
                scanService.startNewScan(myURL.value, (err, resp) => {
                    if (err) {
                        endError(err.message ? err.message : err.toString(), saveTime);
                    } else {
                        if (resp && typeof resp.id === 'string') {
                            node.addPropertyFuture({
                                "nickname": "Status",
                                "name": "_STATUS",
                                "type": "STRING",
                                "value": "ready",
                                "optional": false
                            }, saveTime);
                            node.addPropertyFuture({
                                "nickname": "Scan ID",
                                "name": "_SCAN_ID",
                                "type": "STRING",
                                "value": resp.id,
                                "optional": false
                            }, saveTime);
                            console.log("Scan ID: " + resp.id)
                            node.forceSavingFuture(saveTime);
                        } else {
                            endError("No valid ScanID in arachni response", saveTime);
                        }
                    }
                })
            }

        }
    } else {//--NO SERVICE
        try {
            //Launch a new instance
            var arachs = new arachniREST();
            if (scanID && scanID.value != "") {
                arachs.scanID = scanID.value;
            }
            //If scan options then modify scan opts in arachni
            var scanOpts = node.getParam('_SCAN_OPTS');
            if (scanOpts && scanOpts.value) {
                arachs.setScanOptions(scanOpts.value)
            }
            //If checkList set it
            var checkList = node.getParam('_CHECKS');
            if (checkList && checkList.value) {
                arachs.setScanChecks(checkList.value)
            }
            //Register service and end this iteration
            var asdas = node.registerService('SCANNER', arachs);
            console.log("Registrado servicio?" + asdas)
            node.removeProperty('_ALIVE')
            node.removeProperty('_BUSY')
            node.removeProperty('RETRIES')
            node.removeProperty('_STATUS')
            node.removeProperty('_REPORT')
            node.endCycle()
            //Next iteration we will try launching a scan
        } catch (err) {
            endError(((err && err.message) ? err.message : "Error launching arachni instance"))
        }

    }
}
function analizeReport(resp, saveTime) {
    console.log("Analize report")
    if(storeReport){
        //If library available store report
        storeReport(resp,'ARACHNI').then(()=>{}).catch(err=>{});
    }
    node.addPropertyFuture({
        "nickname": "Report",
        "name": "_REPORT",
        "type": "JSON",
        "value": resp,
        "optional": false
    }, saveTime);
    node.forceSavingFuture(saveTime);
}
function endScan(report, saveTime) {
    var endCB = ()=>{
        try{
            console.log("Report")
            console.log(report.value)
            node.addOutParametersFuture({
                "nickname": "Report",
                "name": "_REPORT",
                "type": "JSON",
                "value": report.value,
                "optional": false
            }, saveTime);
            node.removePropertyFuture('_SCAN_ID', saveTime)
            node.removePropertyFuture('_REPORT', saveTime)
            node.removePropertyFuture('_STATUS'.saveTime)
            try{
                node.removeService('SCANNER')
            }catch(Err){}
            node.endInSuccessFuture(saveTime)
        }catch(err){
            console.log(err)
        }
    };
    var forceDeletion = node.getParam('_PERSISTENT')
    if(forceDeletion && ('value' in forceDeletion) && (forceDeletion.value === true)){
        scanService.shutdownScan(endCB)
    }else{
        endCB();
    }
}

function analizeProgress(resp,saveTime) {
    console.log("Analize progress " + scanID && scanID.value? scanID.value : "")
    let forceSave = false;
    if (resp && 'busy' in resp) {
        if (busy && 'value' in busy) {
            if (resp.busy != busy.value)
                forceSave = true;
        } else {
            forceSave = true;
        }

        node.addPropertyFuture({
            "nickname": "Busy?",
            "name": "_BUSY",
            "type": "BOOLEAN",
            "value": resp.busy,
            "optional": false
        }, saveTime);

    }
    if (resp && 'status' in resp) {
        if (status && 'value' in status) {
            console.log(resp.status ? resp.status : "")
            if (resp.status != status.value)
                forceSave = true;
        } else {
            forceSave = true;
        }
        node.addPropertyFuture({
            "nickname": "Status",
            "name": "_STATUS",
            "type": "STRING",
            "value": resp.status,
            "optional": false
        }, saveTime);

    }
    if (forceSave) {
        node.forceSavingFuture(saveTime);
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
        node.removeService('SCANNER')
        node.removePropertyFuture('_ALIVE', saveTime)
        node.removePropertyFuture('_BUSY', saveTime)
        node.removePropertyFuture('RETRIES', saveTime)
        node.removePropertyFuture('_STATUS', saveTime)
        node.removePropertyFuture('_SCAN_ID', saveTime)
        node.removePropertyFuture('_REPORT', saveTime)
        node.endInErrorFuture(saveTime);
    } else {
        node.addErrParameters({
            "nickname": "Error",
            "name": "_ERROR",
            "type": "ERROR",
            "value": msg
        });
        node.removeService('SCANNER')
        node.removeProperty('_ALIVE')
        node.removeProperty('_BUSY')
        node.removeProperty('RETRIES')
        node.removeProperty('_STATUS')
        node.removeProperty('_SCAN_ID')
        node.removeProperty('_REPORT')
        node.endInError();
    }

}

function processError(err,saveTime) {
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