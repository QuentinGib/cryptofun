<template>
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Porte Monnaie</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link rel="stylesheet" href="./css/main.css">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
</head>
<body>
    <main>
<<<<<<< Updated upstream
        <nav class="burger-nav" id=burgernav>
            <a class="burger-tab" href="/index.html">Accueil</a>
            <a class="burger-tab" href="/Comprendre.html">Comprendre</a>
            <a class="burger-tab" href="/Graphiques.html">Graphiques</a>
            <span class="burger-tab active">Porte Monnaie</span>
            <a class="burger-tab" href="/APropos.html">A propos</a>
        </nav>
=======
      <div v-if="!isConnected()">
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
        <div>
          <p>
            Username :
            {{ username }}
          </p>
          <p>
            Password :
            {{ password }}
          </p>
        </div>
      </div>
      <div v-if="isConnected()">
        <h1>VOUS ETES CONNECTE</h1>
      </div>
>>>>>>> Stashed changes
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
