var template = node.getParam('_TEMPLATE');
var inputParms = node.getInParams();
var globalMatcher = /(#{(\$|(\w))+(\.\w+)*})/
//For finding all arrays


if (template && typeof template.value === 'string' && inputParms && inputParms.length > 0) {
    try {
        var msg = "";
        var arrayMatch = /(#\[\w+.*\])/g;
        msg = arrayReplacer(template.value)
        var matchs = template.value.match(globalMatcher);
        for (var i = 0; i < matchs.length; i++) {
            msg = msg.replace(globalMatcher, replaceGenerator(null))
        }
        console.log(msg)
        node.addOutParameters({
            "nickname": "Message",
            "name": "_MESSAGE",
            "type": "STRING",
            "value": msg,
            "optional": false
        });
        node.endInSuccess();
    } catch (err) {
        console.log("erro " + err ) 
        endError(err)
    }
} else {
    endError("No template")
}
function arrayReplacer(message) {
    var msg = "";
    var arrayMatch = /(#\[\w+.*\])/g;
    var array;
    lastMatch = null;
    var lastPos = 0;
    while ((array = arrayMatch.exec(message)) !== null) {
        try {
            if (lastMatch) {
                if (lastMatch == array[0]) {
                    //Substring
                    var msgArray = message.slice(lastPos + array[0].length, arrayMatch.lastIndex - array[0].length)
                    var match = array[0].slice(2, array[0].length - 1);//Remove #[]
                    var subparams = match.split('.');//Separate characters
                    var father = searchParam(subparams[0]);
                    var arrVal = getAtributeOfParam(father.value, subparams.slice(1))
                    if (arrVal && arrVal.length > 0) {
                        for (var i = 0; i < arrVal.length; i++) {
                            var matcher = /(#{(\$|(\w))+(\.\w+)*})/g;
                            var matchs = msgArray.match(matcher);
                            var msg2 = msgArray;
                            if (matchs) {
                                for (var j = 0; j < matchs.length; j++) {
                                    msg2 = msg2.replace(matcher, replaceGenerator(arrVal[i]))
                                }
                            }
                            msg += msg2;
                        }
                    }
                    lastPos = arrayMatch.lastIndex;
                }
            } else {
                lastMatch = array[0];
                msg += template.value.slice(lastPos, arrayMatch.lastIndex - array[0].length);
                lastPos = arrayMatch.lastIndex - array[0].length;
            }
        } catch (err) { }
    }
    return msg;
}

function endError(err) {
    node.addOutParameters({
        "nickname": "Message",
        "name": "_MESSAGE",
        "type": "STRING",
        "value": "ERROR",
        "optional": false
    });
    node.endInSuccess();
}
var arrI = -1;

function replaceGenerator($ = null) {
    /**
     * Replace the given word with the parameter value
     * @param {string} match 
     */
    return function (match) {
        try {
            //Remove #{}
            match = match.slice(2, match.length - 1)
            var subparams = match.split('.');
            if (subparams.length > 1) {
                if (subparams[0] === '$') {
                    return getAtributeOfParam($, subparams.slice(1))
                } else {
                    var allFather = searchParam(subparams[0]);
                    if (allFather && allFather.value) {
                        return getAtributeOfParam(allFather.value, subparams.slice(1))
                    } else {
                        return "";
                    }
                }
            } else if (subparams.length > 0) {
                if (subparams[0] === '$') {
                    return $;
                } else {
                    var father = searchParam(subparams[0]);
                    if (father && father.value) {
                        return father.value;
                    } else {
                        return "Error taking father"
                    }
                }
            } else {
                return "";
            }
        } catch (err) {
            return ""
        }
    }
}



function getAtributeOfParam(param, attr) {
    if (param.length && param.length > 0) {
        arrI++;
        if (attr.length === 1) {
            return param[arrI][attr[0]]
        } else {
            return getAtributeOfParam(param[arrI][attr[0]], attr.slice(1))
        }
    } else {
        arrI = -1;
        if (attr.length === 1) {
            return param[attr[0]]
        } else {
            return getAtributeOfParam(param[attr[0]], attr.slice(1))
        }
    }

}

function searchParam(param) {
    for (var i = 0; i < inputParms.length; i++) {
        if (inputParms[i].name == param) {
            return inputParms[i]
        }
    }
    return null;
}