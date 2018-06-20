var template = node.getParam('_TEMPLATE');
var pug = require('pug');
var inputParms = node.getInParams();
if (template && typeof template.value === 'string' && inputParms && inputParms.length > 0) {
    try {
        var msg = "";
        //Set the first parameter prepared to reduce
        if(inputParms.length > 0){
            var newInput = {};
            newInput[inputParms[0].name] = inputParms[0].value;
            inputParms[0] = newInput;
        }
        var pugOptions = inputParms.reduce((total, val) => {
            total[val.name] = val.value;
            return total;
        })
        msg = pug.render(template.value,pugOptions);
        node.addOutParameters({
            "nickname": "Message",
            "name": "_MESSAGE",
            "type": "STRING",
            "value": msg,
            "optional": false
        });
        node.endInSuccess();
    } catch (err) {
        endError(err)
    }
} else {
    endError("No template")
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