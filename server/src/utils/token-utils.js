const jwt = require('jsonwebtoken')

const options = {
    expiresIn: '1h',
}

module.exports = {
    createToken (payload) {
        const secret = process.env.AUTHORIZED_PASSWD
        const token = jwt.sign(payload, secret, options)
        return token
    },
    checkToken (token) {
        const secret = process.env.AUTHORIZED_PASSWD
        return jwt.verify(token, secret)
    }
}
