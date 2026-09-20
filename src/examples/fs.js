const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

async function main() {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'node-learning-'));
  const file = path.join(directory, 'message.txt');
  const jsonFile = path.join(directory, 'value.json');

  await fs.writeFile(file, 'Hello fs/promises', 'utf8');
  await fs.writeFile(jsonFile, JSON.stringify({ topic: 'fs', ok: true }), 'utf8');
  console.log('读取文本:', await fs.readFile(file, 'utf8'));
  console.log('读取 JSON:', JSON.parse(await fs.readFile(jsonFile, 'utf8')));
  console.log('目录内容:', await fs.readdir(directory));
  console.log('path.extname:', path.extname(file));
  console.log('path.relative:', path.relative(os.tmpdir(), file));

  await fs.rm(directory, { recursive: true, force: true });
  console.log('临时目录已清理');
}

module.exports = main;

if (require.main === module) main();
