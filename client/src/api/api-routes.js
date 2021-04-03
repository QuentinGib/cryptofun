
const API_HOST = '/api/v1/' // process.env.VUE_APP_API_HOST
export default {
  registerUser: API_HOST + 'newUser',
  login: API_HOST + 'auth/token',
  trade: API_HOST + 'compte/cryptoTrade',
  currencies: API_HOST + 'currencies',
  me: API_HOST + 'auth/me',
  modifyUser: API_HOST + 'auth/newData'
}
