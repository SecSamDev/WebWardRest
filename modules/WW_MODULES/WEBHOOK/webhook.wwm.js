let wh = node.getParam('_WEBHOOK');
console.log(wh)
node.addOutParameters([
    {'name' : "_NODE_ID","type" : "NODE_ID","value" : node.id,optional : false}
]);

if(!wh){
    node.addProperty({
        "nickname" : "webhook",
        "name" : "_WEBHOOK",
        "type" : "WEBHOOK",
        "value":"",
        "optional" : false
    });
    node.forceSaving();
}else{
    node.addOutParameters([
        wh
    ]);
}
node.endInSuccess();