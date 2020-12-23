<template>
  <div>
    <div class="main-header">
      <header class="main-header-title">
        <h1>
          <router-link class="toplink" :to="{ name: 'Home' }"
            >CRYPTO FUN</router-link
          >
        </h1>
        <div class="burger"></div>
      </header>
      <div class="main-nav" id="mainnav">
        <router-link class="main-tab" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="main-tab" :to="{ name: 'comprendre' }"
          >Comprendre</router-link
        >
        <router-link class="main-tab" :to="{ name: 'graphiques' }"
          >Graphiques</router-link
        >
        <router-link class="main-tab" :to="{ name: 'wallet' }"
          >Wallet</router-link
        >
        <router-link class="main-tab" :to="{ name: 'a_propos' }"
          >A propos</router-link
        >
      </div>
    </div>
    <div class="burger-nav" id="burgernav">
      <router-link tag="li" class="burger-tab" :to="{ name: 'Home' }"
        >Home</router-link
      >
      <router-link tag="li" class="burger-tab" :to="{ name: 'comprendre' }"
        >Comprendre</router-link
      >
      <router-link tag="li" class="burger-tab" :to="{ name: 'graphiques' }"
        >Graphiques</router-link
      >
      <router-link tag="li" class="burger-tab" :to="{ name: 'wallet' }"
        >Wallet</router-link
      >
      <router-link tag="li" class="burger-tab" :to="{ name: 'a_propos' }"
        >A propos</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      token: false
    }
  },
  mounted () {
    const burger = document.querySelector('.burger')
    const mainnav = document.getElementById('burgernav')
    burger.addEventListener('click', () => {
      mainnav.classList.toggle('active')
      burger.classList.toggle('active')
    })
    this.token = localStorage.getItem('token')
  }
}
</script>

<style>
#mainnav a.router-link-exact-active {
  color: #bdbdbd;
}
@import "../src/css/main.css";
</style>
