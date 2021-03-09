<template>
  <h1 class="ap-titre">À propos</h1>
  <p class="ap-paragraphe">
    Ce site a été réalisé dans le cadre d'un cours de developpement web.
  </p>
  <p class="ap-paragraphe">
    Quentin GIBON et Lucas LEVY sont deux étudiants de l'<a
      href="https://www.esilv.fr/"
      >ESILV</a
    >
    spécialisés dans les technologies de la FinTech.
  </p>
  <p class="ap-liens">
    GitHub du projet :
    <a href="https://github.com/QuentinGib/cryptofun.git">CryptoFun</a>
  </p>
</template>

<script>
export default {
  name: 'Comprendre'
}
</script>

<style>
.ap-titre {
  display: flex;
  justify-content: center;
  margin: 4%;
}

.ap-paragraphe {
  display: flex;
  justify-content: center;
}

.ap-liens {
  margin-top: 5%;
  margin-left: 3%;
}
</style>
