var endAs = node.getParam('_END_AS');

if(endAs.value){
    switch(endAs.value.toLowerCase()){
        case 'error':
            node.endInError()
            break;
        case 'success':
            node.endInSuccess()
            break;
        default:
            node.endInSuccess()
    }
}else{
    node.addProperty({
        "name" : "_FORCES_END",
        "type" : "BOOLEAN",
        "value": true,
        "optional" : false
    });
    node.endCycle();
}
