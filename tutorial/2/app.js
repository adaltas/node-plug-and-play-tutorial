
const http = require('http')
// highlight-start
// Import the Plugable module
const plugable = require('plugable')
// highlight-end

module.exports = (config = {}) => {
  // highlight-start
  // Initialize our plugin architecture
  const plugins = plugable()
  // highlight-end
  const server = http.createServer((req, res) => {
    res.end(config.message)
  })
  return {
    // highlight-start
    // Return and expose the plugin instance
    plugins: plugins,
    // highlight-end
    start: () => {
      // highlight-start
      // Defined the `start` hook
      plugins.call({
        name: 'server:start',
        args: {
          config: config
        },
        handler: ({config}) => {
          server.listen(config.port)
        }
      })
      // highlight-end
    },
    stop: () => {
      server.close()
    }
  }
}
