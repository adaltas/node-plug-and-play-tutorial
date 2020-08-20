
const http = require('http')

module.exports = (config = {}) => {
  if(!config.mesage){
    config.message = 'hello'
  }
  const server = http.createServer((req, res) => {
    res.end(config.message)
  })
  return {
    start: () => {
      server.listen(config.port)
    },
    stop: () => {
      server.close()
    }
  }
}
