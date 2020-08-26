
const http = require('http')
const plugable = require('plugable')

module.exports = (config = {}) => {
  const plugins = plugable()
  const server = http.createServer((req, res) => {
    res.end(config.message)
  })
  return {
    plugins: plugins,
    start: () => {
      // highlight-start
      plugins.call({
        name: 'server:start',
        // Expose the server argument
        args: {
          config: config,
          server: server
        },
        // Grab the server argument
        handler: ({config, server}) => {
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
