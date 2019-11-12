const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
  guid: { type: String },
  first: { type: String },
  last: { type: String },
  street: { type: String },
  city: { type: String },
  zip: { type: String }
})

clientSchema.index({
  guid: 'text',
  first: 'text',
  last: 'text',
  street: 'text',
  city: 'text',
  zip: 'text'
}) 

module.exports = mongoose.model('Client', clientSchema)
