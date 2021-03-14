import apiRoutes from './api-routes'
import jsonClient from './api-client'

export default {
  login (credentials) {
    return jsonClient.post(apiRoutes.login, { body: credentials })
  },
  trade (token) {
    return jsonClient.getAuth(apiRoutes.trade, token)
  },
  currencies () {
    return jsonClient.get(apiRoutes.currencies)
  },
  checkToken (token) {
    return jsonClient.getAuth(apiRoutes.me, token)
  }
}
