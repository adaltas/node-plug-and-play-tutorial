
const http = require('http')
const plugandplay = require('plug-and-play')

module.exports = (config = {}) => {
  const plugins = plugandplay()
  const server = http.createServer((req, res) => {
    res.end(config.message)
  })
  return {
    plugins: plugins,
    // highlight-start
    // Return a promise
    start: async () => {
      const info = {
        time: new Date()
      }
      // Wait for the promise to resolve
      info.port = await plugins.call({
        // highlight-end
        name: 'server:start',
        args: {
          config: config,
          server: server
        },
        handler: ({config, server}) => {
          // highlight-start
          // Return a Promise
          return new Promise( (accept, reject) => {
            server.listen({port: config.port}, (err) => {
              // Simulate a perceptible delay
              setTimeout( () => {
                err ? reject(err) : accept(server.address().port)
              }, 1000)
            })
          })
          // highlight-end
        }
      })
      return info
    },
    stop: () => {
      server.close()
    }
  }
}
