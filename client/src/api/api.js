import apiRoutes from './api-routes'
import jsonClient from './api-client'

export default {
  registerUser (credentials) {
    return jsonClient.post(apiRoutes.registerUser, { body: credentials })
  },
  login (credentials) {
    console.log(jsonClient.post(apiRoutes.login, { body: credentials }))
    return jsonClient.post(apiRoutes.login, { body: credentials })
  },
  trade (login) {
    return jsonClient.post(apiRoutes.trade, { body: login })
  },
  currencies () {
    return jsonClient.get(apiRoutes.currencies)
  },
  checkToken (token) {
    return jsonClient.getAuth(apiRoutes.me, token)
  },
  modifyUser (token, data) {
    return jsonClient.post(apiRoutes.modifyUser, { headers: { Authorization: 'Bearer ' + token }, body: data })
  }
}
