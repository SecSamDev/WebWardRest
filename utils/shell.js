const sys = require('util');
const cp = require('child_process');
const fs = require('fs');

exports.shell = async () => {
    // Determine the host OS
    let platform = process.platform;
    let subprocess = null;
    try {
        // Linux.
        if (platform == 'linux') {
            if ('so_version' in process) {
                if (process.so_version === 'ash') {
                    fs.accessSync('/bin/ash')
                    subprocess = cp.spawn('/bin/ash', [], { stdio: ['pipe', 'pipe', 'pipe'] });
                } else if (process.so_version === 'bash') {
                    fs.accessSync('/bin/bash')
                    subprocess = cp.spawn('/bin/bash', [], { stdio: ['pipe', 'pipe', 'pipe'] });
                }
            } else {
                try {
                    fs.accessSync('/bin/bash')
                    subprocess = cp.spawn('/bin/bash', [], { stdio: ['pipe', 'pipe', 'pipe'] });
                    process.so_version = 'bash'
                } catch (err) {
                    try {
                        fs.accessSync('/bin/ash')
                        subprocess = cp.spawn('/bin/ash', [], { stdio: ['pipe', 'pipe', 'pipe'] });
                        process.so_version = 'ash'
                    } catch (err) {
                        throw new Error("No linux shell available")
                    }
                }
            }
        }
        // Mac OS X.
        else if (platform == 'darwin') {
            subprocess = cp.spawn('/sbin/bash', [], { stdio: ['pipe', 'pipe', 'pipe'] });
        }
        // Windows.
        else if (platform.match(/^win/)) {
            subprocess = cp.spawn('C:\\windows\\system32\\cmd.exe', [], { stdio: ['pipe', 'pipe', 'pipe'] });
            platform = 'windows'; // Set explicitly 
            process.so_version = 'cmd'
        }
        // Platform not recognized.
        else {
            throw new Error('Operating system could not be identified.');
        }
        return subprocess;
    } catch (err) {
        throw err;
    }


}