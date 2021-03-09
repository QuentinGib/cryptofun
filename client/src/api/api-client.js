export default {
  post (url, options) {
    return fetch(url, {
      headers: {
        'content-type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(options.body),
      method: 'post'
    }).then(res => res.json())
  },

  get (url) {
    return fetch(url, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'get'
    }).then(res => res.json())
  },

  getAuth (url, token) {
    return fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      method: 'get'
    }).then(res => res.json())
  }
}
