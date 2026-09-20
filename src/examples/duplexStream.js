const { Duplex } = require("node:stream");

// 自定义 Duplex 流：同时实现可写端（_write）与可读端（_read）
class UppercaseDuplex extends Duplex {
  constructor() {
    super();
    this.queue = [];
  }

  _write(chunk, encoding, callback) {
    // 写入端：数据加工后放入读队列，形成“回声”
    this.queue.push(chunk.toString().toUpperCase());
    callback();
  }

  _read(size) {
    console.log("size:" + size);
    // 读取端：从队列取数据推给消费者
    while (this.queue.length) {
      console.log("write-queue");
      if (!this.push(this.queue.shift())) break;
    }
    // 写入端结束后，可读端也随之结束
    if (this.writableEnded && this.queue.length === 0) {
      console.log("writableEnded");
      this.push(null);
    }
  }
}

async function main() {
  const duplex = new UppercaseDuplex();

  // 消费可读端
  let output = "";
  duplex.on("data", (chunk) => {
    console.log("chunk:" + chunk);
    output += chunk;
  });

  duplex.on("end", () => {
    console.log("duplex 结果:", output);
    console.log("Duplex 可读/可写两端均已完成");
  });

  // 通过可写端写入，写完后结束
  duplex.write("node ");
  duplex.write("duplex ");
  duplex.end("stream");
}

module.exports = main;

if (require.main === module) main();
