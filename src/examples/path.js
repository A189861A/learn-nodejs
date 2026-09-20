const http = require("http");

// 创建服务器并定义路由
const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello World!");
    res.end();
  } else if (url === "/about" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About Us");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
