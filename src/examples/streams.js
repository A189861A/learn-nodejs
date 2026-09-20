const { Readable, Transform, Writable, pipeline } = require('node:stream');
const { promisify } = require('node:util');

const pipelineAsync = promisify(pipeline);

async function main() {
  const source = Readable.from(['node', ' ', 'stream']);
  const upper = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().toUpperCase());
    }
  });
  let output = '';
  const sink = new Writable({
    write(chunk, encoding, callback) {
      output += chunk.toString();
      callback();
    }
  });

  await pipelineAsync(source, upper, sink);
  console.log('pipeline 结果:', output);
  console.log('Readable/Writable/Transform 已完成');
}

module.exports = main;

if (require.main === module) main();
