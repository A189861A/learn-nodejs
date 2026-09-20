const EventEmitter = require('node:events');

async function main() {
  const bus = new EventEmitter();
  bus.on('order.created', (order) => {
    console.log('普通监听器收到订单:', order.id);
  });
  bus.once('order.created', () => {
    console.log('once 监听器只会执行一次');
  });
  bus.on('error', (error) => {
    console.log('错误事件:', error.message);
  });

  bus.emit('order.created', { id: 'order-001' });
  bus.emit('order.created', { id: 'order-002' });
  bus.emit('error', new Error('示例错误'));
  console.log('监听器数量:', bus.listenerCount('order.created'));
}

module.exports = main;

if (require.main === module) main();
