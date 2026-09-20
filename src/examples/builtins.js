const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const os = require('node:os');
const querystring = require('node:querystring');
const { promisify } = require('node:util');
const zlib = require('node:zlib');

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

async function main() {
  const query = querystring.stringify({ q: 'node js', page: 1 });
  const digest = crypto.createHash('sha256').update('node').digest('hex');
  const token = crypto.randomUUID();
  const compressed = await gzip('可压缩的文本');
  const restored = (await gunzip(compressed)).toString('utf8');

  assert.equal(querystring.parse(query).page, '1');
  console.log('CPU 数:', os.cpus().length);
  console.log('内存总量:', os.totalmem());
  console.log('querystring:', query);
  console.log('sha256:', digest);
  console.log('randomUUID:', token);
  console.log('gzip 字节数:', compressed.length);
  console.log('解压结果:', restored);
}

module.exports = main;

if (require.main === module) main();
