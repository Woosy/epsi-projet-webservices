const express = require('express')

const CustomerController = require('../controllers/customer.controller')

const router = express.Router()

// Get all customers
router.get('/', [
  CustomerController.getAll
])

// Search customers
router.get('/search', [
  CustomerController.search
])

module.exports = router
