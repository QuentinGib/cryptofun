import { createStore } from 'vuex'
import api from '@/api/api'

export default createStore({
  state: {
    user: undefined,
    currencies: []
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setCurrencies (state, currencies) {
      state.currencies = currencies
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
    }
  },
  modules: {
  }
})
