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
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="sendCredentials">
          <div class="user-box">
            <input
            type="text"
            name=""
            required=""
            id="username"
            v-model="username"
            autocomplete="off"
            >
            <label for="username">Username</label>
          </div>
          <div class="user-box">
            <input
            name=""
            id="paswword"
            v-model="password"
            type="password"
            required=""
            autocomplete="off"
            >
            <label>Password</label>
          </div>
          <button type="submit" class="subbutton">
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

.login-box {
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.subbutton {
  border: 1.5px solid #fff;
  font-size: 16px;
  color: #fff;
  height: 2.25rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  padding: 0.25rem 0.5rem;
  width: 15rem;
  transition: all 0.25s;
  background:  #21364E;
  margin-top: 0.625rem;
  order: 4;
  outline: 1px dashed transparent;
  outline-offset: 2px;
  padding-left: 0;
  border-radius: 10px;
}

.subbutton:hover {
  color: #03e9f4;
  border: 1.5px solid #03e9f4;
  background:  #21364E;
}

.subbutton:active {
  color: #21364E;
  border: 1.5px solid #03e9f4;
  background: #03e9f4;
  transition: all 0.125s;
}

</style>
