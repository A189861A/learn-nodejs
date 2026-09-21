const fs = require("fs");
const path = require("path");
var buf = new Buffer.alloc(1024);

// 读取目录内容
fs.readdir(path.join(__dirname, "../../data"), (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(files);
});
// 检查文件或目录是否存在
fs.access(path.join(__dirname, "../../data/output.txt"), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("文件存在");
});
// 追加内容到文件
fs.appendFile(
  path.join(__dirname, "../../data/output.txt"),
  "Hello World",
  "utf8",
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("文件已写入");
  }
);

console.log("准备打开文件！");
fs.open(path.join(__dirname, "../../data/output.txt"), "r", (err, fd) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("文件打开成功，文件描述符为: " + fd);

  console.log("准备读取文件！");
  /*
   * fs.read(fd, buffer, offset, length, position, callback)
   * fd: 文件描述符
   * buffer - 数据写入的缓冲区。
   * offset - 缓冲区写入的写入偏移量。
   * length - 要从文件中读取的字节数。
   * position - 文件读取的起始位置
   * callback(err, bytes, buffer) - 回调函数
   *   - err   :   错误信息
   *   - bytes :   读取的字节数
   *   - buffer:   缓冲区对象
   *
   */
  fs.read(fd, buf, 0, buf.length, 0, (err, bytes, buffer) => {
    if (err) {
      console.error(err);
      return;
    }
    // 仅输出读取的字节
    if (bytes > 0) {
      console.log("bytes:" + buf.slice(0, bytes).toString());
    }

    // 关闭文件
    fs.close(fd, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("文件关闭成功");
    });
  });
});
