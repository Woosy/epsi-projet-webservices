const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
  id: { type: Number },
  guid: { type: String },
  first: { type: String },
  last: { type: String },
  street: { type: String },
  city: { type: String },
  zip: { type: String }
})

module.exports = mongoose.model('Client', clientSchema)
