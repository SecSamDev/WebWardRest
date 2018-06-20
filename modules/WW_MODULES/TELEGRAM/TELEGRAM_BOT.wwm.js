var chat = node.getParam('_CHAT');
var chatID = node.getParam('_CHAT_ID');
var token = node.getParam('_TOKEN');
var retry = node.getParam('_RETRIES');
var preMsg = node.getParam('_PRE_MESSAGE');
var parametersToPrint = node.getParam('_PARAM_PRINT');
console.log("Telegram BOT")
if (parametersToPrint && (parametersToPrint.value === '' || parametersToPrint.length < 1))
    parametersToPrint = null;

if (!retry) {
    retry = {
        "nickname": "Retries",
        "name": "_RETRY",
        "type": "NUMBER",
        "value": 3,
        "optional": false
    }
    node.addProperty(retry);
}

if (chat && (chat.value || (typeof chat.value === 'string' && chat.value.length > 5)) && (token && typeof token.value === 'string' && token.value.length > 15)) {
    var tel = new TelegramBot(token.value.trim(), chat.value.trim());
    if (!chatID //Not exists chatID == null
        || (chatID //ChatID exists but as strings it has small size
            && typeof chatID.value === 'string'
            && chatID.value.length < 5)
    ) {
        //No chat ID
        var saveDate = Date.now();
        tel.getChatId().then(id => {
            tel.chatID = id;
            node.addPropertyFuture({
                "nickname": "Chat ID",
                "name": "_CHAT_ID",
                "type": "STRING",
                "value": id.toString(),
                "optional": false
            }, saveDate);
        }).catch(err => {
            node.addErrParametersFuture({
                "nickname": "Error",
                "name": "ERROR",
                "type": "STRING",
                "value": err.toString(),
                "optional": true
            }, saveDate);
            node.endInErrorFuture(saveDate);
        })
    } else {
        tel.chatID = chatID.value;
        sendMessage();
    }
} else {
    if (!(chat && (chat.value || (typeof chat.value === 'string' && chat.value.length > 5)))) {
        node.addProperties([{
            "nickname": "Chat",
            "name": "_CHAT",
            "type": "STRING",
            "value": "",
            "optional": false
        }, {
            "nickname": "Chat ID",
            "name": "_CHAT_ID",
            "type": "STRING",
            "value": "",
            "optional": false
        }]);
    }
    if (!(token && typeof token.value === 'string' && token.value.length > 15)) {
        node.addProperties([{
            "nickname": "Bot Token",
            "name": "_TOKEN",
            "type": "STRING",
            "value": "",
            "optional": false
        }]);
    }
    node.addProperties([{
        "name": "_SHOW",
        "type": "ARRAY",
        "value": "_CHAT,_TOKEN",
        "optional": false
    }]);
}
function sendMessage(saveDate = Date.now()) {
    var msg = "";
    try {
        if (preMsg && preMsg.value) {
            msg = preMsg.value.toString() + "\n";
        }
        if (parametersToPrint && parametersToPrint.value && parametersToPrint.value.length > 0) {
            if (parametersToPrint.value.length == 1) {
                try {
                    let parm = node.getParam(parametersToPrint.value[0])
                    if (parm && 'value' in parm) {
                        if ((typeof parm.value === 'string')) {

                        } else if (parm.value.length > 0) {
                            parm.value = parm.value.join(',')
                        } else {
                            try {
                                parm.value = JSON.stringify(parm.value, null, '\t')
                            } catch (err) {
                                parm.value = '';
                            }
                        }
                        msg += parm.value + "\n"
                    }
                } catch (err) {
                    console.log("Err in " + parametersToPrint.value[0])
                }
            } else {
                for (var i = 0; i < parametersToPrint.value.length; i++) {
                    try {
                        let parm = node.getParam(parametersToPrint.value[i])
                        if (parm && 'value' in parm) {
                            if ((typeof parm.value === 'string')) {

                            } else if (parm.value.length > 0) {
                                parm.value = parm.value.join(',')
                            } else {
                                try {
                                    parm.value = JSON.stringify(parm.value, null, '\t')
                                } catch (err) {
                                    parm.value = '';
                                }
                            }
                            msg += (parm.nickname !== "" ? parm.nickname + "\n" : "") + parm.value + "\n"
                        }
                    } catch (err) {
                        console.log("Err in " + parametersToPrint.value[i])
                    }
                }
            }

        }
    } catch (err) {
        msg += "Error parsing parameters"
    }
    try {
        tel.sendMessage(msg).then((msgSend) => {
            //Do it in future
            retry.value = 3;
            node.endInSuccessFuture(saveDate);
        }).catch(err => {
            if (retry.value <= 0) {
                node.addErrParametersFuture({
                    "nickname": "Error",
                    "name": "_ERROR",
                    "type": "STRING",
                    "value": err.toString(),
                    "optional": true
                }, saveDate);
                retry.value = 3;
                node.endInErrorFuture(saveDate);
            } else {
                retry.value--;
            }
        })
    } catch (err) { }
}
