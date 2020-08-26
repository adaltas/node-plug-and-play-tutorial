
const readline = require('readline')
const myapp = require('./app')()

// highlight-start
myapp.plugins.register({
  hooks: {
    'server:start': ({config}) => {
      // Set the default port value
      if( !config.port ){
        config.port = 3000
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
