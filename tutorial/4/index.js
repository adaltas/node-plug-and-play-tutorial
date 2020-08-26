
const readline = require('readline')
const myapp = require('./app')()

myapp.plugins.register({
  hooks: {
    'server:start': ({config, server}, handler) => {
      if( !config.port ){
        config.port = 3000
      }
      return server.listening ? null : handler
    }
  }
})

// highlight-start
myapp.plugins.register({
  hooks: {
    'server:start': {
      handler: (args, handler) => {
        return () => {
          const info = handler.call(null, args)
          process.stdout.write('Server is started\n')
          return info
        }
      }
    }
  }
})
// highlight-end

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.prompt();
rl.on('line', (line) => {
  switch (line.trim()) {
    case 'start':
      myapp.start()
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
