# 知识点覆盖表

## 教程基础

| 主题 | 项目位置 |
| --- | --- |
| Node.js 简介、安装、版本、NVM | README、`package.json`、`engines` |
| REPL | `node src/cli.js` 的交互入口，另可运行 `node` 进入原生 REPL |
| Hello World、命令行运行 | `src/cli.js`、所有 `src/examples/*.js` |
| 异步编程 | `src/examples/async.js` |
| 回调、Promise、async/await | `src/examples/async.js` |
| 事件循环 | `src/examples/async.js` |
| EventEmitter | `src/examples/events.js`、`src/lib/events.js` |
| Buffer | `src/examples/buffers.js` |
| Stream、pipe、背压 | `src/examples/streams.js`、`src/server.js` |
| 模块系统、exports、require | `src/examples/modules.js` |
| ES Module | `src/esm-demo.mjs` |

## 核心模块

| 模块 | 项目位置 |
| --- | --- |
| `fs`、`fs/promises` | `src/examples/fs.js`、`src/lib/note-store.js` |
| `path` | `src/examples/fs.js` |
| `url` | `src/examples/basics.js`、`src/server.js` |
| `querystring` | `src/examples/builtins.js` |
| `os` | `src/examples/builtins.js` |
| `util` | `src/examples/builtins.js`、`src/examples/streams.js` |
| `crypto` | `src/examples/builtins.js`、`src/lib/note-store.js` |
| `zlib` | `src/examples/builtins.js` |
| `assert` | `src/examples/builtins.js` |
| `child_process` | `src/examples/process.js` |
| `process`、信号 | `src/examples/process.js`、`src/server.js` |
| `worker_threads` | `src/examples/worker.js` |
| `http` | `src/server.js` |
| `readline` | `src/cli.js` |

## 应用开发方向

| 教程方向 | 当前项目的落点 |
| --- | --- |
| HTTP 模块、路由 | `src/server.js` 手写路由 |
| RESTful API | `src/server.js` 的笔记 CRUD |
| Express | 先用原生 HTTP 掌握请求生命周期；后续可将 handler 迁移为 Express 路由 |
| MySQL、MongoDB、Mongoose | 先用 `data/notes.json` 理解持久化边界；后续替换 `src/lib/note-store.js` |
| Redis | 可把事件日志、缓存查询结果迁移到 Redis |
| WebSocket | 可在 API 之上增加实时笔记变更推送 |
| 文件上传 | 可用 request stream 写入 `uploads/`，并增加大小与类型校验 |
| TLS/HTTPS | 使用 `https.createServer` 和本地证书替换 `http.createServer` |
| DNS、Net、TLS | 属于网络底层实验，建议单独编写连接测试，避免影响主 API |
| cluster | 在多核部署时通过主进程 fork worker，共享端口 |
| npx、npm、package.json | 本项目脚本和依赖策略见 `package.json` |

## 没有强行塞进主流程的内容

JXcore、N-API 原生扩展、C/C++ addon、完整数据库集群和生产级认证需要额外工具链或外部服务。它们不适合在零依赖学习项目中伪装成“已实现”，但可以在掌握本项目后继续练习。
