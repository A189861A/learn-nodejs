const express = require("express");
const app = express();
const port = 3000;

// 创建一个路由器实例
const userRouter = express.Router();

// 路由限制
const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

// 路由优先级：路由的定义顺序决定了它们的优先级，先定义的路由会先被匹配。
// 定义用户相关的路由
userRouter.get("/", (req, res) => {
  res.send("列出所有用户");
});

userRouter.get("/:id", (req, res) => {
  res.send(`获取用户 ${req.params.id}`);
});

app.get("/admin", authMiddleware, (req, res) => {
  res.send("Admin page");
});

app.get("/error", (req, res) => {
    throw new Error("Something went wrong");
  });

// 挂载用户路由器
app.use("/users", userRouter);

// 错误处理：必须放在所有路由和路由器的后面，
// 才能捕获到它们抛出的错误（Express 按定义顺序向后查找错误处理中间件）
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
