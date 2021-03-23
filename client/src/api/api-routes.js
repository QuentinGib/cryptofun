const API_HOST = process.env.VUE_APP_API_HOST
export default {
  login: API_HOST + '/api/v1/auth/token',
  trade: API_HOST + '/api/v1/compte/cryptoTrade',
  currencies: API_HOST + '/api/v1/currencies',
  me: API_HOST + '/api/v1/auth/me'
}
