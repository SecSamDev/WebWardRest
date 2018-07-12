var token = node.getParam('_TOKEN');
var message = node.getParam('_MESSAGE');
var retry = node.getParam('_RETRIES');
var status = node.getParam('_STATUS');
var botURL = node.getParam('_URL');

if(!botURL && !botURL.value){
    botURL = {
        "nickname": "URL",
        "name": "_URL",
        "type": "STRING",
        "value": "http://localhost:3987",
        "optional": false
    }
}else{
    console.log("Bot URL: " + botURL.value)
}
console.log("Skype BOT")
var saveDate = Date.now();
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


if (token && typeof token.value === 'string' && token.value.length > 15) {
    console.log(token.value)
    if (status && status.value && ((status.value).toLowerCase()).trim() === 'done') {
        console.log("STATUS: " + status.value)
        endSuccess(null,saveDate)
    } else {
        console.log("Request?")
        if (request) {
            node.addPropertyFuture({
                "nickname": "Status",
                "name": "_STATUS",
                "type": "STRING",
                "value": "done",
                "optional": false
            });
            try {
                console.log("Trying request")
                console.log(message)
                request.post(botURL.value + '/webward/messages',
                    {
                        json: true,
                        body: {
                            address: token.value,
                            message: message.value,
                        }
                    }, (error, r, body) => {
                        if (error) endError(error)
                        const response = typeof body === 'string' ? JSON.parse(body) : body;
                        console.log(response)
                        if (!response) return
                        if (response)
                            endSuccess(response,saveDate)
                        else
                            endError(response)
                    })
            } catch (err) {
                console.log(err);
                endError(err);
            }
        } else {
            console.log("No exist request");
            endError();
        }
    }
} else {
    endError();
}
function endSuccess(data,saveTime) {
    console.log("Remove property?")
    node.removePropertyFuture("_STATUS",saveTime)
    console.log("Removed")
    node.endInSuccessFuture(saveTime);
    console.log("End")
}
function endError(err,saveTime) {
    if(saveTime){
        node.removePropertyFuture("_STATUS",saveTime)
        node.addOutParametersFuture([{
            "nickname": "Error",
            "name": "_ADD",
            "type": "NUMBER",
            "value": 3,
            "optional": false
        }],saveTime)
        node.endInErrorFuture();
    }else{
        node.removeProperty("_STATUS")
        node.addOutParameters([{
            "nickname": "Error",
            "name": "_ADD",
            "type": "NUMBER",
            "value": 3,
            "optional": false
        }])
        node.endInError();
    }
    
    
}
