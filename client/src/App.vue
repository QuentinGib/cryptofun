<template>
  <div>
    <div class="main-header">
      <header class="main-header-title">
          <h1><a class= toplink href="/index.html">
              CRYPTO FUN
             </a></h1>
      </header>
      <div class="main-nav" id="mainnav">
        <router-link tag="li" class="main-tab" to="/" >Home</router-link>
        <router-link tag="li" class="main-tab" :to="{name: 'comprendre'}">Comprendre</router-link>
        <router-link tag="li" class="main-tab" to="/graphiques">Graphiques</router-link>
        <router-link tag="li" class="main-tab" to="/porte_monnaie">Porte Monnaie</router-link>
        <router-link tag="li" class="main-tab" to="/a_propos">A propos</router-link>
      </div>
    </div>
    <router-view/>
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
    this.token = localStorage.getItem('token')
  }
}
</script>

<style>
#mainnav a.router-link-exact-active {
  color: #BDBDBD;
}
  @import '../src/css/main.css'
</style>
