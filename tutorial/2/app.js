
const http = require('http')
// highlight-start
// Import the Plugable module
const plugable = require('plugable')
// highlight-stop

module.exports = (config = {}) => {
  // highlight-start
  // Initialize our plugin architecture
  const plugins = plugable()
  // highlight-stop
  const server = http.createServer((req, res) => {
    res.end(config.message)
  })
  return {
    // highlight-start
    // Return and expose the plugin instance
    plugins: plugins,
    // highlight-stop
    start: () => {
      // highlight-start
      // Defined the `start` hook
      plugins.hook({
        event: 'server:start',
        args: {
          config: config
        },
        handler: ({config}) => {
          server.listen(config.port)
        }
      })
      // highlight-stop
    },
    stop: () => {
      server.close()
    }
  }
}
