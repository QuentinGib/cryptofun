<template>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprendre</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
</head>
<body>
    <main>
        <div class="cours">
            <router-link class="cours_gauche" to="/cours/blockchain">
                <img class="imgBlockchain" src="../images/blockchain_icon.png" alt="image Blockchain">
                <figcapton>Blockchain </figcapton>
            </router-link>
            <router-link class="cours_droite" to="/cours/crypto">
                <img class="imgCryptocurrency" src="../images/cryptocurrency.png" alt="image Cryptocurrency">
                <figcaption>Cryptomonnaies</figcaption>
            </router-link>
        </div>
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
  @import '../css/main.css'
</style>
