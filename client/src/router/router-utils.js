import store from '@/store'

export function checkTokenBeforeEnter (to, from, next) {
  store.dispatch('checkToken')
    .then(isValidToken => {
      if (isValidToken) {
        next()
      } else {
        next({
          path: '/porte_monnaie',
          query: { redirect: to.fullPath }
        })
      }
    })
}
