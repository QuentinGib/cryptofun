const jwt = require('jsonwebtoken')

const options = {
    expiresIn: '1h',
}

module.exports = {
    createToken (payload) {
        const secret = process.env.SECRET || '53CR37!'
        const token = jwt.sign(payload, secret, options)
        return token
    },
    checkToken (token) {
        const secret = process.env.SECRET || '53CR37!'
        jwt.verify(token, secret)
    }
}