const http = require('node:http');
const fs = require('node:fs');
const { Readable, Transform, pipeline } = require('node:stream');
const { promisify } = require('node:util');
const notes = require('./lib/note-store');
const events = require('./lib/events');

const port = Number(process.env.PORT || 3000);
const pipelineAsync = promisify(pipeline);

for (const event of ['note.created', 'note.updated', 'note.deleted']) {
  events.on(event, (note) => {
    console.log(`[event] ${event}: ${note.id}`);
  });
}

function sendJson(response, statusCode, data) {
  const body = JSON.stringify(data);
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body)
  });
  response.end(body);
}

function sendText(response, statusCode, body, contentType = 'text/plain; charset=utf-8') {
  response.writeHead(statusCode, { 'content-type': contentType });
  response.end(body);
}

async function readBody(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1024 * 1024) throw new Error('请求体不能超过 1 MB');
  }
  if (!body) return {};
  return JSON.parse(body);
}

async function exportNotes(response) {
  const all = await notes.readAll();
  const source = Readable.from(all.map((note) => `${JSON.stringify(note)}\n`));
  const lineNumber = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, `NOTE ${chunk}`);
    }
  });
  response.writeHead(200, {
    'content-type': 'application/x-ndjson; charset=utf-8',
    'content-disposition': 'attachment; filename="notes.ndjson"'
  });
  await pipelineAsync(source, lineNumber, response);
}

async function handler(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  if (request.method === 'GET' && pathname === '/') {
    return sendText(
      response,
      200,
      'Node.js 学习实验室 API\nGET /api/notes\nPOST /api/notes\nGET /api/notes/:id\nPUT /api/notes/:id\nDELETE /api/notes/:id\n'
    );
  }

  if (request.method === 'GET' && pathname === '/health') {
    return sendJson(response, 200, { ok: true, pid: process.pid, now: new Date().toISOString() });
  }

  if (request.method === 'GET' && pathname === '/api/notes/export') {
    return exportNotes(response);
  }

  if (!pathname.startsWith('/api/notes')) {
    return sendJson(response, 404, { error: 'Not Found' });
  }

  const id = pathname.split('/')[3];

  if (request.method === 'GET' && !id) {
    return sendJson(response, 200, await notes.list(url.searchParams.get('q') || ''));
  }

  if (request.method === 'POST' && !id) {
    return sendJson(response, 201, await notes.create(await readBody(request)));
  }

  if (request.method === 'GET' && id) {
    const note = await notes.get(id);
    return note ? sendJson(response, 200, note) : sendJson(response, 404, { error: 'Note not Found' });
  }

  if (request.method === 'PUT' && id) {
    const note = await notes.update(id, await readBody(request));
    return note ? sendJson(response, 200, note) : sendJson(response, 404, { error: 'Note not Found' });
  }

  if (request.method === 'DELETE' && id) {
    const note = await notes.remove(id);
    return note ? sendJson(response, 200, note) : sendJson(response, 404, { error: 'Note not Found' });
  }

  return sendJson(response, 405, { error: 'Method Not Allowed' });
}

const server = http.createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);
  handler(request, response).catch((error) => {
    console.error(error);
    if (!response.headersSent) sendJson(response, 400, { error: error.message });
    else response.destroy(error);
  });
});

server.listen(port, () => {
  console.log(`Node.js 学习 API 已启动: http://localhost:${port}`);
  console.log(`数据文件: ${notes.dataFile}`);
});

function shutdown(signal) {
  console.log(`收到 ${signal}，正在关闭服务...`);
  server.close(() => process.exit(0));
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

module.exports = { server, handler };
