const CustomerService = require('../services/customer.service')

// get all customers
exports.getAll = async (req, res) => {
  const customers = await CustomerService.findAll()
  return res.status(200).json({
    customers
  })
}

// search some customers
exports.search = async (req, res) => {
  const search = req.body
  const customers = await CustomerService.search(search)
  return res.status(200).json({
    customers
  })
}