const chapters = [
  {
    id: 'basics',
    title: '运行时与全局对象',
    file: './examples/basics.js',
    topics: 'console、process、__dirname、__filename、定时器、URL、环境变量'
  },
  {
    id: 'async',
    title: '异步编程与事件循环',
    file: './examples/async.js',
    topics: '回调、Promise、async/await、微任务、宏任务、错误处理'
  },
  {
    id: 'events',
    title: 'EventEmitter 事件机制',
    file: './examples/events.js',
    topics: '事件监听、once、emit、错误事件、事件驱动'
  },
  {
    id: 'buffers',
    title: 'Buffer 与二进制',
    file: './examples/buffers.js',
    topics: '编码、字节长度、切片、拷贝、JSON、base64'
  },
  {
    id: 'streams',
    title: 'Stream 流与背压',
    file: './examples/streams.js',
    topics: 'Readable、Writable、Transform、pipeline、highWaterMark'
  },
  {
    id: 'modules',
    title: '模块系统',
    file: './examples/modules.js',
    topics: 'CommonJS、exports、module.exports、缓存、ES Module'
  },
  {
    id: 'fs',
    title: '文件系统与路径',
    file: './examples/fs.js',
    topics: 'fs/promises、path、目录、JSON、watch、临时文件'
  },
  {
    id: 'builtins',
    title: '常用内置模块',
    file: './examples/builtins.js',
    topics: 'os、util、url、querystring、crypto、zlib、readline、assert'
  },
  {
    id: 'process',
    title: '进程与子进程',
    file: './examples/process.js',
    topics: 'argv、env、信号、execFile、spawn、cluster 概念'
  },
  {
    id: 'worker',
    title: 'Worker Threads',
    file: './examples/worker.js',
    topics: '线程消息、isMainThread、CPU 密集型任务'
  },
  {
    id: 'server',
    title: '综合 REST API',
    file: './server.js',
    topics: 'HTTP、路由、REST、JSON、事件、持久化、优雅关闭'
  }
];

module.exports = chapters;
