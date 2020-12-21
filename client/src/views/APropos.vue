<template>
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A propos</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
</head>
<body>
    <main>
      <h1 class="ap-titre">
        À propos
      </h1>
      <p class="ap-paragraphe">
        Ce site a été réalisé dans le cadre d'un cours de developpement web.
      </p>
      <p class="ap-paragraphe">
        Quentin GIBON et Lucas LEVY sont deux étudiants de l'<a href="https://www.esilv.fr/">ESILV</a>
        spécialisés dans les technologies de la FinTech.
      </p>
      <p class="ap-liens">
        GitHub du projet : <a href="https://github.com/QuentinGib/cryptofun.git">CryptoFun</a>
      </p>
    </main>
</body>
</html>
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
