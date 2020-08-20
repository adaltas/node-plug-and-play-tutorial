const http = require('http')
const plugable = require('plugable')

module.exports = (config = {}) => {
  // Initialize our plugin architecture
  const plugins = plugandplay()
  const server = http.createServer((req, res) => {
    res.end(config.message)
  })
  return {
    plugins: plugins,
    start: async () => {
      const info = {
        time: new Date()
      }
      // highlight-start
      // Get the result returned by the last hook handler being called
      info.port = await plugins.hook({
      // highlight-stop
        event: 'server:start',
        args: {
          config: config,
          server: server
        },
        handler: ({config, server}) => {
          server.listen(config.port)
          // highlight-start
          return server.address().port
          // highlight-stop
        }
      })
      return info
    },
    stop: () => {
      server.close()
    }
  }
}
