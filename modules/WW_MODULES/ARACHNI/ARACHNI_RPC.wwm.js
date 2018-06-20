var myURL = node.getParam('_SCAN_URL');
var status = node.getParam('_STATUS');
var busy = node.getParam('_BUSY');
var token = node.getParam('_INSTANCE_TOKEN');
var instanceURL = node.getParam('_INSTANCE_URL');
var alive = node.getParam('_ALIVE');

//The service for storing ARACHNI
var scanService = node.getService('SCANNER');

if (!myURL || !myURL.value || myURL.value === '') {
    endError("No valid SCAN URL")
} else {
    if (scanService) {
        //Exists Scan Service-------------------------------------------
        if (token && token.value && instanceURL && instanceURL.value) {
            var arachs = scanService;
            if (alive && alive.value) {
                //Instance alive
                if (busy && busy.value) {
                    //Busy => wait to finish scan
                    if (status && status.value) {
                        //Ended 
                        let saveTime = Date.now();
                        arachs.getReport().then(report => {
                            node.addPropertyFuture({
                                "nickname": "Report",
                                "name": "_REPORT",
                                "type": "JSON",
                                "value": report,
                                "optional": true
                            }, saveTime);
                            node.endInSuccessFuture(saveTime);
                        }).catch(err => { })
                    } else {
                        //Not ended
                        scanService.isBusy().then(bus => {
                            if (!bus) {
                                //Busy= true but now is false=> scanning complete
                                node.addPropertyFuture({
                                    "nickname": "Ended",
                                    "name": "_STATUS",
                                    "type": "BOOLEAN",
                                    "value": true,
                                    "optional": true
                                }, saveTime);
                                node.forceSavingFuture(saveTime);
                            }
                        }).catch(err => {
                            endError(err.message ? err.message : err.toString(), saveTime);
                        })
                    }
                } else if (busy && !busy.value) {
                    if (status && status.value) {
                        //Not busy but status= ended
                        let saveTime = Date.now();
                        arachs.getReport().then(report => {
                            node.addPropertyFuture({
                                "nickname": "Report",
                                "name": "_REPORT",
                                "type": "JSON",
                                "value": report,
                                "optional": true
                            }, saveTime);
                            node.endInSuccessFuture(saveTime);
                        }).catch(err => { })
                    } else {
                        //Not busy and not status so start scan
                        let saveTime = Date.now();
                        arachs.startScan(myURL.value).then((started) => {
                            if (started) {
                                node.addPropertyFuture({
                                    "nickname": "Busy",
                                    "name": "_BUSY",
                                    "type": "BOOLEAN",
                                    "value": true,
                                    "optional": true
                                }, saveTime);
                                node.addPropertyFuture({
                                    "nickname": "Ended",
                                    "name": "_STATUS",
                                    "type": "BOOLEAN",
                                    "value": false,
                                    "optional": true
                                }, saveTime);
                                node.forceSavingFuture(saveTime);
                            } else {
                                //Not started? why?   
                            }
                        }).catch(err => {
                            endError(err.message ? err.message : err.toString(), saveTime)
                        })
                    }

                } else {
                    let saveTime = Date.now();
                    //Not querieds
                    scanService.isBusy().then(bus => {
                        node.addPropertyFuture({
                            "nickname": "Busy",
                            "name": "_BUSY",
                            "type": "BOOLEAN",
                            "value": bus,
                            "optional": true
                        }, saveTime);
                        node.forceSavingFuture(saveTime);
                    }).catch(err => {
                        endError(err.message ? err.message : err.toString(), saveTime);
                    })
                }
            } else {
                let saveTime = Date.now();
                scanService.isAlive().then(ali => {
                    node.addPropertyFuture({
                        "nickname": "Alive?",
                        "name": "_ALIVE",
                        "type": "BOOLEAN",
                        "value": ali,
                        "optional": false
                    }, saveTime);
                    node.forceSavingFuture(saveTime);
                }).catch(err => {
                    endError(err.message ? err.message : err.toString(), saveTime);
                })
            }
        } else {
            var saveTime = Date.now();

        }
    } else {
        var saveTime = Date.now();
        if (token && token.value && instanceURL && instanceURL.value) {
            try {
                //Connect to a instance
                var arachs = arachni(token.value, instanceURL.value)
                var scanOpts = node.getParam('_SCAN_OPTS');
                if (scanOpts && scanOpts.value) {
                    arachs.setOptions(scanOpts.value);
                }
                var checkList = node.getParam('_CHECKS');
                if (checkList && checkList.value) {
                    arachs.setChecks(checkList.value);
                }
                node.registerService('SCANNER', arachs);
                node.endButStarted()
            } catch (err) {
                endError(err && err.message ? err.message : "Error launching arachni instance",saveTime)
            }

        } else {
            try {
                //Launch a new instance
                var arachs = arachni();
                //If scan options then modify scan opts in arachni
                var scanOpts = node.getParam('_SCAN_OPTS');
                if (scanOpts && scanOpts.value) {
                    arachs.setOptions(scanOpts.value);
                }
                //If checkList set it
                var checkList = node.getParam('_CHECKS');
                if (checkList && checkList.value) {
                    arachs.setChecks(checkList.value);
                }
                //Register service and end this iteration
                node.registerService('SCANNER', arachs);
                node.endButStarted()
                //Next iteration we will try launching a scan
            } catch (err) {
                endError(((err && err.message) ? err.message : "Error launching arachni instance"))
            }

        }
    }
}
function endError(msg, saveTime) {
    if (saveTime) {
        node.addErrParametersFuture({
            "nickname": "Error",
            "name": "_ERROR",
            "type": "ERROR",
            "value": msg
        }, saveTime);
        node.endInErrorFuture(saveTime);
    } else {
        node.addErrParameters({
            "nickname": "Error",
            "name": "_ERROR",
            "type": "ERROR",
            "value": msg
        });
        node.endInError();
    }

}
