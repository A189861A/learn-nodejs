const path = require('node:path');
const safeJson = require('../lib/safe-json');

async function main() {
  console.log('当前模块:', path.basename(__filename));
  console.log('require.resolve:', require.resolve('../lib/safe-json'));
  console.log('CommonJS 导出:', safeJson.parse('{"ok":true}'));
  console.log('module.loaded:', module.loaded);
  console.log('缓存条目:', Object.keys(require.cache).length);
  console.log('ES Module 示例:', 'src/esm-demo.mjs 中使用 export/import');
}

module.exports = main;

if (require.main === module) main();
