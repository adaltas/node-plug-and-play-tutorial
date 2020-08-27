
const http = require('http')
const plugandplay = require('plug-and-play')

module.exports = (config = {}) => {
  // highlight-start
  const plugins = plugandplay({
    // Pass the global plugins instance
    parent: module.exports.plugins
  })
  // highlight-end
  const server = http.createServer((req, res) => {
    res.end(config.message)
  })
  return {
    plugins: plugins,
    start: async () => {
      const info = {
        time: new Date()
      }
      info.port = await plugins.call({
        name: 'server:start',
        args: {
          config: config,
          server: server
        },
        handler: ({config, server}) => {
          return new Promise( (accept, reject) => {
            server.listen({port: config.port}, (err) => {
              setTimeout( () => {
                err ? reject(err) : accept(server.address().port)
              }, 1000)
            })
          })
        }
      })
      return info
    },
    stop: () => {
      server.close()
    }
  }
}

// highlight-start
// Export global plugins
module.exports.plugins = plugandplay()
// highlight-end
