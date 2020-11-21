const fetch = require('isomorphic-fetch')
const express = require('express')

const currenciesRoutes = require('./currencies-routes.js')
const authRoutes = require('./auth-routes.js')

const verifyToken = require('../middlewares/verify-token.js')

const router = new express.Router()

router.use('/auth', authRoutes)

router.use('/currencies', currenciesRoutes)

router.use('/compte', verifyToken, currenciesRoutes)

module.exports = router