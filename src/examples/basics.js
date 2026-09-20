async function main() {
  console.log('Node.js:', process.version);
  console.log('平台:', process.platform);
  console.log('架构:', process.arch);
  console.log('当前目录:', process.cwd());
  console.log('当前文件:', __filename);
  console.log('当前目录文件:', __dirname);
  console.log('命令行参数:', process.argv.slice(2));
  console.log('NODE_ENV:', process.env.NODE_ENV || '未设置');

  const address = new URL('https://example.com:8443/articles?page=2#node');
  console.log('URL 主机:', address.host);
  console.log('URL 路径:', address.pathname);
  console.log('URL 查询:', address.searchParams.get('page'));

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('setTimeout: timers 阶段执行');
      resolve();
    }, 10);
  });
}

module.exports = main;

if (require.main === module) main();
