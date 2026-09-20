const test = require('node:test');
const assert = require('node:assert/strict');
const chapters = require('../src/chapters');
const safeJson = require('../src/lib/safe-json');

test('章节索引包含核心 Node.js 知识点', () => {
  assert.ok(chapters.some((chapter) => chapter.id === 'async'));
  assert.ok(chapters.some((chapter) => chapter.id === 'streams'));
  assert.ok(chapters.some((chapter) => chapter.id === 'server'));
});

test('safe-json 对非法 JSON 返回 fallback', () => {
  assert.deepEqual(safeJson.parse('bad json', { ok: false }), { ok: false });
  assert.equal(safeJson.stringify({ ok: true }), '{\n  "ok": true\n}');
});
