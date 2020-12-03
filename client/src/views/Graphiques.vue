<template>
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Graphiques</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
</head>
<body>
    <main>
    </main>
    <div>
      <ul>
        <li class="info-currency" v-for="currency in currencies.slice(0, 11)" :key="currency.id">
          <p class="currency-name">{{ currency.name }}</p>
          <p class="currency-price">{{ currency.price }}</p>
          <div v-if="currency.evolutionPrice >= 0">
            <p class="priceIncrease">▲ {{ currency.evolutionPrice }} %</p>
          </div>
          <div v-else>
            <p class="priceDecrease">▼ {{ Math.abs(currency.evolutionPrice) }} %</p>
          </div>
        </li>
      </ul>
    </div>
</body>
</html>
</template>

<script>
export default {
  name: 'Graphiques',

  data () {
    return {
      currencies: [],
      error: ''
    }
  },

  mounted () {
    // Fetch de currencies
    fetch('/api/v1/currencies')
      .then(res => res.json())
      .then(({ currencies }) => {
        this.currencies = currencies
      })
      .catch(error => { this.error = error })
  }
}
</script>

<style>
  @import '../css/main.css'
</style>
