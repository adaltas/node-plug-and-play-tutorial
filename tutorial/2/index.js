
const readline = require('readline')
const app = require('./app')()

// highlight-start
app.plugins.register({
  hooks: {
    'server:start': ({config}) => {
      // Set the default port value
      if( !config.port ){
        config.port = 3000
      }
    }
  }
})
// highlight-stop

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.prompt();
rl.on('line', (line) => {
  switch (line.trim()) {
    case 'start':
      app.start()
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
