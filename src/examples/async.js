const { setImmediate: waitImmediate } = require('node:timers/promises');

function callbackStyle(value, callback) {
  setTimeout(() => {
    if (!value) return callback(new Error('value 不能为空'));
    callback(null, value.toUpperCase());
  }, 10);
}

function promiseStyle(value) {
  return new Promise((resolve, reject) => {
    callbackStyle(value, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

async function main() {
  console.log('同步 1');
  const promise = Promise.resolve().then(() => console.log('Promise 微任务'));
  setTimeout(() => console.log('setTimeout 宏任务'), 0);
  setImmediate(() => console.log('setImmediate 检查阶段'));
  console.log('同步 2');
  await promise;

  callbackStyle('callback', (error, result) => {
    if (error) console.error(error.message);
    else console.log('回调风格:', result);
  });

  try {
    console.log('Promise 风格:', await promiseStyle('promise'));
    await waitImmediate();
    console.log('async/await: 可读的异步流程');
    await promiseStyle('');
  } catch (error) {
    console.log('集中式错误处理:', error.message);
  }
}

module.exports = main;

if (require.main === module) main();
