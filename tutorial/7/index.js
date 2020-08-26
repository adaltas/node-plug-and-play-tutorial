
const readline = require('readline')
const myapp = require('./app')()

myapp.plugins.register({
  name: 'plugin:enhancer',
  hooks: {
    'server:start': ({config, server}, handler) => {
      if( !config.port ){
        config.port = 3000
      }
      return server.listening ? null : handler
    }
  }
})

myapp.plugins.register({
  name: 'plugin:reporter',
  required: 'plugin:enhancer',
  hooks: {
    'server:start': {
      before: 'plugin:enhancer',
      handler: (args, handler) => {
        return async () => {
          const info = await handler.call(null, args)
          process.stdout.write('Server is started\n')
          return info
        }
      }
    }
  }
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.prompt();
rl.on('line', async (line) => {
  switch (line.trim()) {
    case 'start':
      const info = await myapp.start()
      process.stdout.write(`Port is ${info.port}\n`)
      break;
    case 'stop':
      myapp.stop()
      break;
    default:
      process.stdout.write('Only `start` and `stop` are supported\n')
      break;
  }
  rl.prompt();
})
