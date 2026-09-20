# 练习清单

1. 给 `src/examples/async.js` 增加 `Promise.all` 和 `Promise.allSettled` 示例。
2. 给 `src/server.js` 增加 `PATCH /api/notes/:id`，只更新传入字段。
3. 为笔记增加 `createdBy` 字段，并在查询中支持 `tag` 参数。
4. 使用 `zlib.createGzip()` 为 `/api/notes/export` 增加 `Accept-Encoding: gzip` 支持。
5. 用 `readline` 增加一个命令行笔记创建工具。
6. 为 `src/lib/note-store.js` 增加写入队列，避免并发写文件时互相覆盖。
7. 使用 `worker_threads` 生成大文本摘要，比较主线程计算与 Worker 计算的耗时。
8. 将 `src/lib/note-store.js` 替换为 SQLite、MongoDB 或 MySQL 实现，保持 server 的 API 不变。
9. 使用 Node.js `node:test` 为 CRUD、404、坏 JSON 和查询过滤补齐测试。
10. 使用 `https.createServer`、自签名证书和环境变量实现 HTTPS 本地实验。
