async function main() {
  const text = "Node.js 中文";
  const buffer = Buffer.from(text, "utf8");
  const base64 = buffer.toString("base64");
  const restored = Buffer.from(base64, "base64").toString("utf8");
  const copied = Buffer.alloc(buffer.length);

  console.log("copied:", copied);

  buffer.copy(copied);

  console.log("字节长度:", buffer.byteLength);
  console.log("十六进制:", buffer.toString("hex"));
  console.log("base64:", base64);
  console.log("还原文本:", restored);
  console.log("拷贝相等:", Buffer.compare(buffer, copied) === 0);
  console.log("JSON:", JSON.stringify(buffer));
  console.log("切片:", buffer.subarray(0, 4).toString("utf8"));

  const dst = Buffer.from("XXXXXXX");
  const src = Buffer.from("1234");
  // 从dst下标2开始写入src
  src.copy(dst, 2);
  console.log(dst.toString()); // XX123X

  
}

module.exports = main;

if (require.main === module) main();
