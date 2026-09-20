const { execFile, spawn } = require('node:child_process');
const { promisify } = require('node:util');

const execFileAsync = promisify(execFile);

async function main() {
  console.log('pid:', process.pid);
  console.log('argv0:', process.argv0);
  console.log('内存使用:', Math.round(process.memoryUsage().rss / 1024 / 1024), 'MB');
  console.log('退出码默认值:', process.exitCode || 0);

  const { stdout } = await execFileAsync(process.execPath, ['-p', '1 + 2']);
  console.log('execFile stdout:', stdout.trim());

  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['-e', 'process.stdout.write("spawn ok")']);
    let output = '';
    child.stdout.on('data', (chunk) => {
      output += chunk;
    });
    child.on('error', reject);
    child.on('close', (code) => {
      console.log('spawn code/output:', code, output);
      resolve();
    });
  });

  console.log('cluster 适合多进程共享端口；本示例用 child_process 展示进程边界');
}

module.exports = main;

if (require.main === module) main();
