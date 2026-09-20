const express = require('express');
const app = express();
const port = 3131;

// 日志记录中间件
const logger = (req, res, next) =>{
    console.log(`Request Type: ${req.method} ${req.url}`);
    next();
}

// 使用中间件
app.use(logger);

// 定义一个GET路由
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 定义一个POST路由
app.post('/submit', (req, res) => {
    res.send('POST request received');
});

// 定义带路径参数的路由
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});