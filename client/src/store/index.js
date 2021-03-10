import { createStore } from 'vuex'
import api from '@/api/api'

export default createStore({
  state: {
    user: undefined,
    currencies: [],
    tradeCurrencies: [],
    cryptoSelected: ''
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setCurrencies (state, currencies) {
      state.currencies = currencies
    },
    setTradableCryptos (state, tradeCurrencies) {
      state.tradeCurrencies = tradeCurrencies
    },
    setCryptoSelected (state, cryptoSelected) {
      state.cryptoSelected = cryptoSelected
    }
  },
  actions: {
    login ({ commit }, credentials) {
      api.login(credentials)
        .then(data => {
          const { success, token, message } = data
          if (!success) {
            // afficher le message contenu dans `message`
            console.error(message)
            return
          }
          localStorage.setItem('token', token)
          commit('setUser', message)
        })
    },

    graphiques ({ commit }) {
      api.currencies()
        .then(data => {
          const { success, currencies } = data
          if (!success) {
            console.error('erreur lors du chargement des infos')
            return
          }
          commit('setCurrencies', currencies)
        })
    },

    cryptoTrade ({ commit }, token) {
      api.trade(token)
        .then(({ data }) => {
          commit('setTradableCryptos', data.slice(0, 11))
          commit('setCryptoSelected', data[0].slice(0, 11).name)
          localStorage.removeItem('prices')
          localStorage.setItem('prices', JSON.stringify(data.slice(0, 11)))
        })
    }
  },
  modules: {
  }
})
