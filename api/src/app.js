const app = require('./config/express')
const logger = require('./config/winston')
const config = require('./config/config')
const initMongo = require('./config/mongoose')

// 1st: establish mongodb connection
initMongo(async () => {
  // 2nd: start the web server
  const port = config.app_port
  app.listen(port, () => {
    logger.info('Loaded express.')
    logger.info(`App started in ${config.node_env.toUpperCase()} mode.`)
    logger.info(`Server started on http://localhost:${port}.`)
  })
})

module.exports = app
