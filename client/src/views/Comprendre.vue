<template>
  <div class="cours">
    <router-link class="cours_gauche" to="/cours/blockchain">
      <img
        class="imgBlockchain"
        src="../images/blockchain_icon.png"
        alt="image Blockchain"
      />
      <figcaption>Blockchain</figcaption>
    </router-link>
    <router-link class="cours_droite" to="/cours/crypto">
      <img
        class="imgCryptocurrency"
        src="../images/cryptocurrency.png"
        alt="image Currency"
      />
      <figcaption>Cryptomonnaies</figcaption>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Comprendre'
}
</script>

<style></style>
