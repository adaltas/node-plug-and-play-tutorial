
const http = require('http')
const plugandplay = require('plug-and-play')

module.exports = (config = {}) => {
  const plugins = plugandplay()
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
