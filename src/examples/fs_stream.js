const fs = require("fs");
const path = require("path");

// 读取文件流
const readableStream = fs.createReadStream(
  path.join(__dirname, "../../data/output.txt")
);
readableStream.on("data", (chunk) => {
  console.log(`读取到 ${chunk} 字节`);
});
readableStream.on("end", () => {
  console.log("读取完成");
});

// 写入文件流（覆盖现有文件内容）
const writableStream = fs.createWriteStream(
  path.join(__dirname, "../../data/output.txt")
);
writableStream.write("xxx xxx");
writableStream.end();

// 打开文件
// fd = file descriptor（文件描述符）
fs.open(path.join(__dirname, "../../data/output.txt"), "w", (err, fd) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("fd:" + fd);
  fs.close(fd, () => {
    console.log("文件已关闭");
  });   // 必须关！Node 不会帮你自动关
});


fs.stat(path.join(__dirname, "../../data/output.txt"), (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stats);
});