# Node.js 学习实验室

这是一个围绕[菜鸟教程 Node.js 教程](https://www.runoob.com/nodejs/nodejs-tutorial.html)整理的可运行学习项目。项目不依赖第三方包，使用 Node.js 内置模块演示运行时基础、异步编程、模块、文件系统、网络服务、流、事件、进程和 Worker Threads 等内容。

## 快速开始

```bash
npm run list
npm run learn
npm run run -- basics
npm run server
```

启动服务器后访问：

- `http://localhost:3000/`
- `http://localhost:3000/api/notes`
- `http://localhost:3000/health`
- `http://localhost:3000/api/notes/export`

## CLI

```text
node src/cli.js list
node src/cli.js run basics
node src/cli.js run async
node src/cli.js run events
node src/cli.js run buffers
node src/cli.js run streams
node src/cli.js run modules
node src/cli.js run fs
node src/cli.js run builtins
node src/cli.js run process
node src/cli.js run worker
node src/cli.js run all
```

直接执行 `node src/cli.js` 会进入交互式章节选择。

## 学习路径

1. `basics`：Node.js 运行时、全局对象、process、定时器、URL。
2. `async`：回调、Promise、async/await、事件循环和错误处理。
3. `events`：EventEmitter、自定义事件和一次性监听器。
4. `buffers`：Buffer、编码、二进制和 JSON。
5. `streams`：Readable、Writable、Transform、背压和 pipeline。
6. `modules`：CommonJS、ES Module、模块缓存、exports/module.exports。
7. `fs`：path、文件读写、目录、watch、JSON 持久化。
8. `builtins`：os、util、url、querystring、crypto、zlib、readline、assert。
9. `process`：环境变量、信号、child_process、cluster 基础。
10. `worker`：Worker Threads、消息通信和 CPU 密集型任务。
11. `server`：手写 HTTP 路由、REST CRUD、事件日志和文件存储。

## 综合项目

`src/server.js` 是一个“学习笔记 API”：

- 使用 `http.createServer` 创建 HTTP 服务。
- 使用 `URL` 解析路由和查询参数。
- 使用 `fs/promises` 操作 JSON 文件。
- 使用 `EventEmitter` 发布 `note.created`、`note.updated`、`note.deleted`。
- 使用 `stream.pipeline` 导出笔记。
- 使用 `crypto.randomUUID` 生成 ID。
- 使用 HTTP 方法实现 GET、POST、PUT、DELETE。
- 使用进程信号优雅关闭服务。

示例：

```bash
curl http://localhost:3000/api/notes
curl -X POST http://localhost:3000/api/notes ^
  -H "content-type: application/json" ^
  -d "{\"title\":\"学习事件循环\",\"content\":\"先理解任务队列，再理解 Promise 微任务\"}"
curl "http://localhost:3000/api/notes?tag=node"
```

PowerShell 中可以使用：

```powershell
Invoke-RestMethod http://localhost:3000/api/notes
Invoke-RestMethod http://localhost:3000/api/notes -Method Post `
  -ContentType 'application/json' `
  -Body '{"title":"学习事件循环","content":"先理解任务队列，再理解 Promise 微任务"}'
```

## 目录

```text
.
├─ data/
│  └─ notes.json
├─ docs/
│  ├─ coverage.md
│  └─ exercises.md
├─ src/
│  ├─ cli.js
│  ├─ chapters.js
│  ├─ server.js
│  ├─ esm-demo.mjs
│  ├─ lib/
│  │  ├─ events.js
│  │  ├─ note-store.js
│  │  └─ safe-json.js
│  └─ examples/
│     ├─ basics.js
│     ├─ async.js
│     ├─ events.js
│     ├─ buffers.js
│     ├─ streams.js
│     ├─ modules.js
│     ├─ fs.js
│     ├─ builtins.js
│     ├─ process.js
│     └─ worker.js
└─ test/
   └─ smoke.test.js
```

## 说明

教程中的 Express、MySQL、MongoDB、Mongoose、Redis、WebSocket、N-API 等内容依赖外部包或服务，本项目用 `docs/coverage.md` 给出对应的迁移方向，并优先实现不依赖外部环境的核心原理。这样可以先掌握 Node.js 本身，再逐步接入框架和数据库。
