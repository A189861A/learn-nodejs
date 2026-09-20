const zlib = require('zlib');
const fs = require('fs');
var path = require("path");

// 创建一个可读流
const readableStream = fs.createReadStream(path.join(__dirname, '../../data/output.txt'));

// 创建一个转换流（压缩）
const gzip = zlib.createGzip();

// 创建一个可写流
const writableStream = fs.createWriteStream(path.join(__dirname, '../../data/output.txt.gz'));

// 将可读流管道到转换流，再管道到可写流
readableStream.pipe(gzip).pipe(writableStream);

// 监听完成事件
writableStream.on('finish', () => {
    console.log('File compressed successfully.');
});


/*
    // Node.js 内部将模块包装为类似这样的函数：
    (function(exports, require, module, __filename, __dirname) {
        // 模块代码在这里
    });
**/