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
  const query = req.query.search

  // const page = req.query.page || 1
  // const limit = req.query.limit || 25

  const customers = await CustomerService.findAll({
    $text: { 
      $search: query,
      $caseSensitive: false,
        $diacriticSensitive: false
    }
  })

  return res.status(200).json({
    customers
  })
}
