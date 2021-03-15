import { createStore } from 'vuex'
import api from '@/api/api'

export default createStore({
  state: {
    user: undefined,
    currencies: [],
    tradeCurrencies: [],
    holdings: null,
    holdingsNotNull: [],
    sommeTotale: 0,
    holdingDolls: -1
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
    setHoldings (state, holdings) {
      if (state.holdings === null) {
        state.holdings = holdings
      }
    },
    setSommeTotale (state, sommeCurrencies) {
      state.sommeTotale = Math.round((sommeCurrencies + state.holdingDolls) * 1000) / 1000
    },
    setHoldingsNotNull (state, holdingsNotNull) {
      state.holdingsNotNull = holdingsNotNull
    },
    setHoldingsDolls (state, difference) {
      if (state.holdingDolls === -1) {
        state.holdingDolls = 1000
      } else {
        state.holdingDolls += difference
      }
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
        .then(data => {
          const { success, currencies } = data
          if (!success) {
            console.error('erreur lors du chargement des infos')
            return
          }
          commit('setTradableCryptos', currencies.slice(0, 11))
          // à mettre sur mongodb sans doute
          const holdsTemp = currencies.slice(0, 11).map((currency) => ({
            id: currency.id,
            symbol: currency.symbol,
            name: currency.name,
            somme: 0
          }))
          commit('setHoldings', holdsTemp)
          commit('setHoldingsNotNull', holdsTemp.filter(
            (crypto) => crypto.somme > 0
          ))
          let sum = 0
          for (const cryptoHolded of holdsTemp) {
            sum +=
              currencies.find((x) => x.id === cryptoHolded.id).price *
              cryptoHolded.somme
          }
          commit('setSommeTotale', sum)
        })
    },

    checkToken ({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      return api.checkToken(token)
        .then(data => {
          const { success, message, user } = data

          if (!success) {
            // Afficher le message d'erreur à l'utilisateur
            console.warn(message)
            return false
          }

          commit('setUser', user)
          return true
        })
    }
  },
  modules: {
  }
})
