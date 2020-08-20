
const http = require('http')
const plugable = require('plugable')

module.exports = (config = {}) => {
  const plugins = plugandplay()
  const server = http.createServer((req, res) => {
    res.end(config.message)
  })
  return {
    plugins: plugins,
    start: () => {
      plugins.hook({
        event: 'server:start',
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
