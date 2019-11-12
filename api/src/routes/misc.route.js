const express = require('express')

const version = require('../../package.json').version

const router = express.Router()

// Check if the app is alive
router.get('/health-check', (req, res) => { res.send('OK') })

// Get API's version
router.get('/version', (req, res) => { res.json({ version }) })

module.exports = router
