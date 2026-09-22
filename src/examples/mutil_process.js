const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const script = path.join(__dirname, '../../data/support.js');

for (let i = 0; i < 3; i++) {
    const workerProcess = child_process.exec(`node "${script}" ${i}`, function(error, stdout, stderr) {
        if (error) {
            console.log(i+"--"+error.stack);
            console.log(i+'--Error code: '+error.code);
            console.log(i+'--Signal received: '+error.signal);
        }
        console.log(i+'--stdout: ' + stdout);
        console.log(i+'--stderr: ' + stderr);
    });

    /*
    code 为 0 就是**"正常结束"——0 不代表"第 0 个"或"循环变量"，
    它是进程的退出码**，0 = 成功，非 0 = 失败，跟 i 没有任何关系。
    */
    workerProcess.on('exit', function (code) {
        console.log('子进程已退出，退出码 '+ code);
    });
}