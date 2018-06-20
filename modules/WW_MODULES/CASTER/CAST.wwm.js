

var casting = node.getParam('_VALUES');

//TODO: not working why???
if(casting && casting.value){
    var theKeys = Object.keys(casting.value);
    for(var i = 0; i < theKeys.length; i++){
        var paramAux = node.getParam(theKeys[i]);
        if(paramAux){
            node.addOutParameters([{
                "nickname" : paramAux.nickname,
                "name" : casting.value[theKeys[i]],
                "type" : paramAux.type,
                "value": paramAux.value,
                "optional" : paramAux.optional ? paramAux.optional : false 
            }]);
        }
    }
    node.endInSuccess();
}else{
    node.addProperties([{
        "nickname" : "Cast Values",
        "name" : "_VALUES",
        "type" : "JSON",
        "value": {
            "_SOMTHING" : "_MESSAGE"
        },
        "optional" : false
    }]);
}