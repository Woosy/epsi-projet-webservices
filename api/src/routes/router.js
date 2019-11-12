const express = require('express')
const miscRoutes = require('./misc.route')
const customersRoutes = require('./customer.route')

const router = express.Router()

// Core routes
router.use('/customers', customersRoutes)

// Other routes
router.use('/', miscRoutes)

module.exports = router
