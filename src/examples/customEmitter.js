const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

function main() {
  const emitter = new MyEmitter();
  emitter.on('customEvent', function(a, b) {
    console.log(a, b);
  });
  emitter.emit('customEvent', 'a', 'b');
}

main();