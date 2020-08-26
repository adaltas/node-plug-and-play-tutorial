
const readline = require('readline')
const myapp = require('./app')()

myapp.plugins.register({
  hooks: {
    // highlight-start
    // Declare the `handler` second argument
    'server:start': ({config, server}, handler) => {
      if( !config.port ){
        config.port = 3000
      }
      // Return null when the server is already listening
      return server.listening ? null : handler
    }
    // highlight-end
  }
})

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
