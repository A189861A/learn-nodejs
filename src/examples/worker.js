const {
  Worker,
  isMainThread,
  parentPort,
  workerData
} = require('node:worker_threads');

function countPrimes(limit) {
  let count = 0;
  for (let number = 2; number <= limit; number += 1) {
    let prime = true;
    for (let divisor = 2; divisor * divisor <= number; divisor += 1) {
      if (number % divisor === 0) {
        prime = false;
        break;
      }
    }
    if (prime) count += 1;
  }
  return count;
}

if (!isMainThread) {
  parentPort.postMessage({
    limit: workerData.limit,
    primes: countPrimes(workerData.limit)
  });
} else {
  async function main() {
    const result = await new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData: { limit: 10000 } });
      worker.once('message', resolve);
      worker.once('error', reject);
    });
    console.log('Worker 计算结果:', result);
  }

  module.exports = main;
  if (require.main === module) main();
}
