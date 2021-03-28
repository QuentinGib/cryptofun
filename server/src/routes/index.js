const fetch = require('isomorphic-fetch')
const express = require('express')

const currenciesRoutes = require('./currencies-routes.js')
const authRoutes = require('./auth-routes.js')
const verifyToken = require('../middlewares/verify-token.js')
const { createUser } = require('../models/user-queries.js')

const router = new express.Router()

router.use('/auth', authRoutes)

router.use('/currencies', currenciesRoutes)

router.use('/compte', /*verifyToken,*/ currenciesRoutes)

app.post('/newUser', (req, res) => {
  const login = req.body.login
  const password = req.body.password
  const holdings = req.body.holdings
  const holdingDolls = req.body.holdingDolls

  createUser({
    login,
    password,
    holdings,
    holdingDolls

  }).then(user => {
    res.status(201).json({
      success: true,
      user
    })
  })
})

module.exports = router
