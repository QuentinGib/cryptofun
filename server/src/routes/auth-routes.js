const express = require('express')
const tokenUtils = require('../utils/token-utils.js')
const router = new express.Router()
const dotenv= require('dotenv')
const { getUserByLogin, modifyUser } = require('../models/user-queries.js')
const { hash, compareHash } = require('../utils/crypto.js')

router.post('/token', (req, res) => {
  // const authorizedLogin = process.env.AUTHORIZED_LOGIN
  // const authorizedPasswd = process.env.AUTHORIZED_PASSWD
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
        compareHash(body.password, user.password).then(isTrue => {
          if ( !user || !isTrue) {
              res.status(401).json({
                  success: false,
                  message: password
              })
              return
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

router.post('/newData', (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  const body = req.body

  const response = res
    .header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    .header('Expires', '-1')
    .header('Pragma', 'no-cache')

  try {
    const payload = tokenUtils.checkToken(token)
    const login = payload.login
    const userData = {
      login,
      holdings: body.holdings,
      holdingDolls: body.holdingDolls
    }
    modifyUser(userData)
    response.json({
      success: true,
      message: 'Done updating'
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
