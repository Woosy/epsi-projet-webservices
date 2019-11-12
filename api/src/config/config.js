const convict = require('convict')
require('dotenv').config()

const config = convict({
  node_env: {
    doc: 'The application runtime environment',
    format: ['development', 'production'],
    default: 'development',
    arg: 'node_env',
    env: 'NODE_ENV'
  },
  app_port: {
    doc: 'The API port',
    format: Number,
    default: 3005,
    arg: 'app_port',
    env: 'APP_PORT'
  },
  db: {
    host: {
      doc: 'The MongoDB hostname',
      format: String,
      default: 'projet-webservices-database',
      arg: 'db_host',
      env: 'DB_HOST'
    },
    port: {
      doc: 'The MongoDB port',
      format: Number,
      default: '27017',
      arg: 'db_port',
      env: 'DB_PORT'
    },
    name: {
      doc: 'The MongoDB database name',
      format: String,
      default: 'webservices',
      arg: 'db_name',
      env: 'DB_NAME'
    },
    user: {
      doc: 'The MongoDB user',
      format: String,
      default: 'username',
      arg: 'db_user',
      env: 'DB_USER'
    },
    password: {
      doc: `The MongoDB user's password`,
      format: String,
      default: 'password',
      arg: 'db_password',
      env: 'DB_PASSWORD'
    }
  }
})

config.validate({ allowed: 'strict' })
module.exports = config.getProperties()
