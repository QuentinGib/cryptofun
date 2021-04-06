import { createStore } from 'vuex'
import api from '@/api/api'

export default createStore({
  state: {
    user: undefined,
    currencies: [],
    tradeCurrencies: [],
    holdingsNotNull: [],
    sommeTotale: 0
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
    setSommeTotale (state, sommeTotale) {
      state.sommeTotale = sommeTotale
    },
    setHoldingsNotNull (state, holdingsNotNull) {
      state.holdingsNotNull = holdingsNotNull
    }
  },
  actions: {
    registerUser ({ commit }, credentials) {
      console.log({ commit })
      return api.currencies()
        .then(data => {
          const { success, currencies } = data
          console.log(success)
          const holdsTemp = currencies.slice(0, 11).map((currency) => ({
            id: currency.id,
            symbol: currency.symbol,
            name: currency.name,
            somme: 0
          }))
          api.registerUser({
            login: credentials.login,
            password: credentials.password,
            holdings: holdsTemp
          })
            .then(data => {
              const { success, message } = data
              if (!success) {
                console.error(message)
              }
            })
        })
    },

    login ({ commit }, credentials) {
      console.log(credentials)
      return api.login(credentials)
        .then(data => {
          const { success, token, message } = data
          if (!success) {
            // afficher le message contenu dans `message`
            window.alert(message)
            return false
          }
          localStorage.setItem('token', token)
          commit('setUser', message)
          return true
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

    cryptoTrade ({ commit }, login) {
      return api.trade(login)
        .then(data => {
          const { success, currencies, holds } = data
          if (!success) {
            console.error('erreur lors du chargement des infos')
            return
          }
          commit('setTradableCryptos', currencies.slice(0, 11))
          // chercher les données dans mongodb
          commit('setHoldingsNotNull', holds.holdings.filter(
            (crypto) => crypto.somme > 0
          ))
          let sum = 0
          for (const cryptoHolded of holds.holdings) {
            sum +=
              currencies.find((x) => x.id === cryptoHolded.id).price *
              cryptoHolded.somme
          }
          sum = Math.round((sum + holds.holdingDolls) * 1000) / 1000
          commit('setSommeTotale', sum)
          return {
            holdings: holds.holdings,
            holdingDolls: holds.holdingDolls
          }
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
    },

    modifyUser ({ commit }, data) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      return api.modifyUser(token, data)
        .then(data => {
          const { success, message } = data

          if (!success) {
            // Afficher le message d'erreur à l'utilisateur
            console.warn(message)
            return false
          }
          return true
        })
    }
  },
  modules: {
  }
})
