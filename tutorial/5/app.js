
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
      plugins.call({
        name: 'server:start',
        args: {
          config: config,
          server: server
        },
        handler: ({config, server}) => {
          server.listen(config.port)
        }
      })
    },
    stop: () => {
      server.close()
    }
  }
}
