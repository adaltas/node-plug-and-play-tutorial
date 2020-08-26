const http = require('http')
const plugable = require('plugable')

module.exports = (config = {}) => {
  const plugins = plugable()
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
      // Get the result returned by the last called handler
      info.port = await plugins.call({
      // highlight-end
        name: 'server:start',
        args: {
          config: config,
          server: server
        },
        // highlight-start
        // Handler returning the port number
        handler: ({config, server}) => {
          server.listen(config.port)
          return server.address().port
        }
        // highlight-end
      })
      return info
    },
    stop: () => {
      server.close()
    }
  }
}
