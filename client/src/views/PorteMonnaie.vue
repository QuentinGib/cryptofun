<template>
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Porte Monnaie</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
</head>
<body>
    <main>
      <div>
        <form @submit.prevent="sendCredentials">
          <p>
            <label for="username">
              Username
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="Username"
            >
          </p>
          <p>
            <label for="password">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="Password"
            >
          </p>
          <button type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </main>
</body>
</html>
</template>

<script>
export default {
  name: 'porte_monnaie',
  data () {
    return {
      username: undefined,
      password: undefined,
      connected: false
    }
  },
  methods: {
    sendCredentials () {
      const login = this.username
      const password = this.password
      fetch('/api/v1/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login,
          password
        })
      })
        .then(res => res.json())
        .then(({ success, token, message }) => {
          localStorage.setItem('token', token)
          localStorage.setItem('login', login)
          if (success) {
            this.$router.push({ name: 'wallet', query: { redirect: '/wallet' } })
          }
        })
        .catch(error => { this.error = error })
    }
  }
}
</script>

<style>

</style>
