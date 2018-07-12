var contador = node.getParam('_COUNT');
var max_contador = node.getParam('_COUNT_TO');
if(contador !== null && max_contador !== null){
    contador.value++;
    if(contador.value === max_contador.value || parseInt(contador.value) == parseInt(max_contador.value)){
        node.addProperty(contador);
        var inputParms = node.getInParams();
        node.addOutParameters(inputParams);
        node.endInSuccess();
    }else if(contador.value > max_contador.value){
        contador.value = 0;
        node.addProperty(contador);
        node.endCycle();
    }else{
        node.addProperty(contador);
        node.endCycle();
    }
}else{
    node.addProperties([{
        "nickname" : "Counter",
        "name" : "_COUNT",
        "type" : "NUMBER",
        "value" : "0",
        "optional" : false
    },
    {
        "nickname" : "Counter until",
        "name" : "_COUNT_TO",
        "type" : "NUMBER",
        "value" : "3",
        "optional" : false
    }]);
}