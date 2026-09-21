const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const script = path.join(__dirname, '../../data/support.js');

for (let i = 0; i < 3; i++) {
    const workerProcess = child_process.exec(`node "${script}" ${i}`, function(error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });

    workerProcess.on('exit', function (code) {
        console.log('子进程已退出，退出码 '+ code);
    });
}