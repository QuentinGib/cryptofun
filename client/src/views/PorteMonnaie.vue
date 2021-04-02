<template>
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
        />
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
        />
        <label>Password</label>
      </div>
      <button type="submit" class="subbutton">Se connecter</button>
    </form>
    <router-link to="/signin">S'enregistrer</router-link>
  </div>
</template>

<script>
export default {
  name: 'porte_monnaie',
  data () {
    return {
      username: undefined,
      password: undefined
    }
  },
  methods: {
    sendCredentials () {
      const login = this.username
      const password = this.password
      this.$store.dispatch('login', { login, password })
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
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
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
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
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
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
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
  background: #21364e;
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
  background: #21364e;
}

.subbutton:active {
  color: #21364e;
  border: 1.5px solid #03e9f4;
  background: #03e9f4;
  transition: all 0.125s;
}
</style>
