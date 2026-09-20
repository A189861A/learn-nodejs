const readline = require('node:readline');
const chapters = require('./chapters');

function printHelp() {
  console.log(`
Node.js 学习实验室

用法:
  node src/cli.js list
  node src/cli.js run <章节 id>
  node src/cli.js run all
  node src/cli.js
`);
}

function listChapters() {
  console.table(chapters.map(({ id, title, topics }) => ({ id, title, topics })));
}

async function runChapter(id) {
  const chapter = chapters.find((item) => item.id === id);
  if (!chapter) {
    console.error(`找不到章节: ${id}`);
    listChapters();
    process.exitCode = 1;
    return;
  }

  if (chapter.id === 'server') {
    console.log('综合服务需要直接运行: npm run server');
    return;
  }

  const demo = require(chapter.file);
  await demo();
}

async function runAll() {
  for (const chapter of chapters.filter(({ id }) => id !== 'server')) {
    console.log(`\n===== ${chapter.id}: ${chapter.title} =====`);
    await require(chapter.file)();
  }
}

function interactive() {
  const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  listChapters();
  input.question('\n输入章节 id，或输入 all / q：', async (answer) => {
    input.close();
    if (answer === 'q' || answer === 'quit') return;
    if (answer === 'all') return runAll();
    return runChapter(answer.trim());
  });
}

async function main() {
  const [command, value] = process.argv.slice(2);
  if (!command) return interactive();
  if (command === 'list') return listChapters();
  if (command === 'run') return value === 'all' ? runAll() : runChapter(value);
  printHelp();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
