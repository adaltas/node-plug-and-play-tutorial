
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
