const {ArachniRPC} = require('../ww_libraries/arachni/arachni-rpc')


 async function main(){
    let arach = new ArachniRPC('192.168.99.100',30263,'Arach');
    arach.rpc.stderr.pipe(process.stderr)
    arach.rpc.stdout.pipe(process.stdout)
    await arach.waitStarted();
    console.log("Alive: " + await arach.isAlive())
    console.log("Busy: " + await arach.isBusy())
    //let b = await arach.startScan('https://127.0.0.1:80')
    if(b){
        console.log("Busy: " + await arach.isBusy())
        setTimeout(async ()=>{
            //console.log(await arach.report())
            console.log("Busy: " + await arach.isBusy())
            console.log("Busy: " + await arach.isBusy())
            console.log("Busy: " + await arach.isBusy())
            console.log("Busy: " + await arach.isBusy())
        },3000)
    }
    
 }
 main()