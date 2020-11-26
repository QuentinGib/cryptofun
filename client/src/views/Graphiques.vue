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
</body>
</html>
</template>

<script>
export default {
  name: 'Graphiques',

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
