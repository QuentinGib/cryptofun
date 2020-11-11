const express = require('express')

const tokenUtils = require('../utils/token-utils.js')

const router = new express.Router()

router.post('/token', (req, res) => {
    const authorizedLogin = process.env.AUTHORIZED_LOGIN
    const authorizedPasswd = process.env.AUTHORIZED_PASSWD

    const body = req.body

    if (!body || !body.login || !body.password) {
        res.json({
            success: false,
            message: 'Login and password are required'
        })
        return
    }

    if (body.password !== authorizedPasswd || body.login !== authorizedLogin) {
        res.json({
            success: false,
            message: 'Invalid credentials'
        })
        return
    }

    const payload = {
        login: body.login,
    }

    const token = tokenUtils.sign(payload)

    res.json({
        success: true,
        token
    })
})

module.exports = router