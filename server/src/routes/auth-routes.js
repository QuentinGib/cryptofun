const express = require('express')
const tokenUtils = require('../utils/token-utils.js')
const router = new express.Router()
const dotenv= require('dotenv')
const { getUserByLogin } = require('../models/user-queries.js')

router.post('/token', (req, res) => {
  // const authorizedLogin = process.env.AUTHORIZED_LOGIN
  // const authorizedPasswd = process.env.AUTHORIZED_PASSWD
  console.log('a')
  const body = req.body
  getUserByLogin(body.login)
  .then(user => {
    if (!body || !body.login || !body.password) {
        res.status(401).json({
            success: false,
            message: 'Login and password are required'
        })
        return
    }
    if ( !user || body.password !== user.password /* user.password */ ) {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        })
        return user
    }
    const payload = {
        login: body.login,
    }
    const token = tokenUtils.createToken(payload)
    res.status(201).json({
        success: true,
        token,
        message: body.login
    })    
  })
})

router.get('/me', (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', '')

  const response = res
    .header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    .header('Expires', '-1')
    .header('Pragma', 'no-cache')

  try {
    const payload = tokenUtils.checkToken(token)
    const login = payload.login
    // Chercher et trouver l'utilisateur correspondant à ce login
    // TODO: à faire avec mongodb
    console.log({ payload })
    response.json({
      success: true,
      user: {
        login,
        password: undefined
      }
    })
  } catch (error) {
    response.status(401)
      .json({
        success: false,
        message: 'Token invalide'
      })
  }
})

module.exports = router
