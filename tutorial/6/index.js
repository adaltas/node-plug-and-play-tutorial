
const readline = require('readline')
const app = require('./app')()

app.plugins.register({
  module: 'plugin:enhancer',
  hooks: {
    'server:start': ({config, server}, handler) => {
      if( !config.port ){
        config.port = 3000
      }
      return server.listening ? null : handler
    }
  }
})

app.plugins.register({
  module: 'plugin:reporter',
  hooks: {
    'server:start': {
      before: 'plugin:enhancer',
      handler: (args, handler) => {
        return () => {
          const result = handler.call(null, args)
          process.stdout.write('Server is started\n')
          return result
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
      // highlight-start
      const info = await app.start()
      process.stdout.write(`Port is ${info.port}\n`)
      // highlight-stop
      break;
    case 'stop':
      app.stop()
      break;
    default:
      process.stdout.write('Only `start` and `stop` are supported\n')
      break;
  }
  rl.prompt();
})
