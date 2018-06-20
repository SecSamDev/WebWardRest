const {ArachniScanOptions} = require('../ww_libraries/arachni/arachni-scan-options')
const fs = require('fs')
let scanOpts = new ArachniScanOptions();
fs.writeFileSync('arachniOpts.json',JSON.stringify(scanOpts,null,"\t"))