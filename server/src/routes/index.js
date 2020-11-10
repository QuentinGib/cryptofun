const fetch = require('isomorphic-fetch')
const express = require('express')

const currenciesRoutes = require('./currencies-routes.js')

const router = new express.Router()

router.use('/currencies', currenciesRoutes)

module.exports = router