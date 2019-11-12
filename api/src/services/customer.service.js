const CustomerModel = require('../models/customer.model')

// ================================================
//  == Methods
// ================================================

exports.search = async (search) => {
  const customers = await CustomerModel.find(search).lean()
  return customers
}

// ================================================
//  == Getters
// ================================================

exports.findAll = async (search) => {
  const customers = await CustomerModel.find({}).lean()
  return customers
}
