const mongoose = require('mongoose')
const config = require('./config')
const logger = require('./winston')

mongoose.Promise = Promise

module.exports = async function initConnection (callback) {
  // connect to mongo db
  const mongoHost = config.db.host
  const mongoUri = `mongodb://${config.db.user}:${config.db.password}@${mongoHost}:${config.db.port}/${config.db.name}${config.travis ? '' : '?authSource=admin'}`
  const mongooseOpt = {
    keepAlive: 1,
    useNewUrlParser: true
  }

  // fix some depreciations issues
  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', false)

  await mongoose.connect(mongoUri, mongooseOpt).then(() => {
    logger.info('Connected to MongoDB.')
    callback()
  }).catch(/* istanbul ignore next */(err) => {
    logger.error('MongoDB connection failed: ', err)
  })
}
