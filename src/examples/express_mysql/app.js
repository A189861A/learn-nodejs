const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');

const app = express();
const port = 3000;

// 中间件
// Adds headers: Access-Control-Allow-Origin: *
app.use(cors()); // 跨域
app.use(express.json()); // 解析json请求体（必须！否则post拿不到req.body）

// 挂载路由
app.use('/api/user', userRouter);

// 启动服务
app.listen(port, () => {
  console.log(`服务启动成功，地址：http://localhost:${port}`);
});