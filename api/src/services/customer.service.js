const CustomerModel = require('../models/customer.model')


// ================================================
//  == Getters
// ================================================

exports.findAll = async (search = {}) => {
  const customers = await CustomerModel.find(
    search,
    { score: { $meta: 'textScore' } } // "matching %" score
  )
  .sort( { score: { $meta: "textScore" } } ) // scrt by "best matches"
  .lean()

  return customers
}
