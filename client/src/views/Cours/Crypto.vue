<template>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cours Cryptomonnaies</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
</head>
<body>
  <main>
    <h1 class="cours-titre">Qu’est-ce qu’une crypto monnaie ?</h1>
    <p class="cours-paragraphe">
      On désigne par crypto monnaie à la fois une monnaie cryptographique et un système de paiement de pair à pair. Ces monnaies numériques sont donc des monnaies virtuelles dans le sens où ces dernières sont caractérisées par une absence de support physique : ni pièces ni billets et les paiements par chèque ou carte bancaire ne sont pas possibles non plus.

      Ce sont des monnaies alternatives qui n’ont de cours légal dans aucun pays du globe. Leur valeur n’est pas indexée sur le cours de l’or ni sur celle des devises classiques et elles ne sont pas non plus régulées par un organe central ou des institutions financières. Il n’y a pas de banques centrales à leurs têtes. Et pourtant, sécurité et transparence sont leurs principaux atouts ! Car en effet la cryptographie sécurise les transactions qui sont toutes vérifiées et enregistrées dans un domaine public, assurant tout à la fois confidentialité et authenticité, grâce à la technologie Blockchain.
    </p>
  </main>
</body>
</html>
</template>

<script>
export default {
  name: 'cryptomonnaies'
}
</script>

<style>
.cours-titre {
  display: flex;
  justify-content: center;
  color: #1B3E8F;
}

.cours-soustitre {
  margin-left: 3%;
  margin-bottom: 1%;
  margin-top: 5%;
}

.cours-paragraphe {
  margin: 3%;
  margin-top: 2%;
  font-size: 1.2em;
}
</style>
