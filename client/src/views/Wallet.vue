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
    <main class="wallet-main">
      <div class="wallet-block1">
        <div class="wallet-sommeTotale">
          <h2>Valeur totale</h2>
          <p>{{sommeTotale}}$</p>
        </div>
        <div class="wallet-monnaieDispo">
          <h2>Monnaie disponible</h2>
          <p>{{ holdingDolls }}$</p>
        </div>
      </div>
      <div class="wallet-block2">
        <div class="wallet-cryptoDispo">
          <h2>Cryptos disponibles</h2>
          <ul>
            <li v-for="hold in holdings.filter(crypto => crypto.somme > 0)" :key="hold.id">
              <p>{{ hold.name }}</p>
              <p>{{ hold.somme }}</p>
            </li>
          </ul>
        </div>
        <div class="wallet-AchatRevente">
          <h2>Trading :</h2>
          <ul>
            <form @submit.prevent="acheter">
              <select v-model="cryptoSelected">
                <option
                  v-for="(currency, idx) in currencies"
                  v-bind:key="currency.id + idx"
                  :value="currency.name"
                >
                  {{ currency.name }}
                </option>
              </select>
              <p>
                <label for="achat">
                  pour un montant de $
                </label>
                <input
                  id="achat"
                  v-model.number="achat"
                  type="number"
                >
              </p>
              <button type="submit">Acheter</button>
            </form>
            <form @submit.prevent="vendre">
              <select v-model="cryptoSelected">
                <option v-for="currency in holdings.filter(crypto => crypto.somme > 0)" v-bind:key="currency.id" >
                  {{ currency.name }}
                </option>
              </select>
              <p>
                <label for="vente">
                  pour un montant de $
                </label>
                <input
                  id="vente"
                  v-model.number="vente"
                  type="number"
                >
              </p>
              <button type="submit">Vendre</button>
            </form>
          </ul>
        </div>
      </div>
    </main>
</body>
</html>
</template>

<script>
export default {
  name: 'Wallet',

  data () {
    return {
      achat: 0,
      vente: 0,
      login: '',
      sommeTotale: 0,
      currencies: [],
      holdings: [],
      holdingDolls: 0,
      cryptoSelected: ''
    }
  },

  mounted () {
    const token = localStorage.getItem('token')
    this.login = localStorage.getItem('login')
    this.holdingDolls = localStorage.getItem('HoldingDollsOf' + this.login) || 1000
    this.sommeTotale = this.holdingDolls
    this.currencies = JSON.parse(localStorage.getItem('prices'))
    this.holdings = JSON.parse(localStorage.getItem('holdingsOf' + this.login))

    fetch('/api/v1/compte/cryptoTrade', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(({ currencies }) => {
        this.currencies = currencies.slice(0, 11)
        this.cryptoSelected = this.currencies[0].name
        localStorage.removeItem('prices')
        localStorage.setItem('prices', JSON.stringify(this.currencies))
      })
      .catch(error => { this.error = error })

    fetch('/api/v1/compte/holdings', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(({ currencies }) => {
        this.holdings = currencies
        let sum = this.holdingDolls
        for (const cryptoHolded of this.holdings) {
          sum += cryptoHolded.somme * this.currencies.find(x => x.id === cryptoHolded.id).price
        }
        this.sommeTotale = sum
      })
      .catch(error => { this.error = error })
  },

  methods: {
    acheter () {
      this.currencies = JSON.parse(localStorage.getItem('prices'))
      console.log(this.currencies)
      if (this.holdingDolls >= this.achat) {
        var a = (this.currencies.filter(crypto => crypto.name === this.cryptoSelected).pop())
        console.log(a)
        this.holdings[this.holdings.indexOf(this.holdings.filter(crypto => crypto.name === this.cryptoSelected).pop())].somme += this.achat / (this.currencies.filter(crypto => crypto.name === this.cryptoSelected).pop()).price
        this.holdingDolls -= this.achat
        localStorage.setItem('holdingsOf' + this.login, JSON.stringify(this.holdings))
        localStorage.setItem('HoldingDollsOf' + this.login, JSON.stringify(this.holdingDolls))
      } else {
        // erreur
      }
    },

    vendre () {
      const possessionEnCrypto = (this.holdings.filter(choixCrypto => choixCrypto.name === this.cryptoSelected).pop()).somme
      console.log(possessionEnCrypto)
      const venteEnCrypto = this.vente / (this.currencies.filter(crypto => crypto.name === this.cryptoSelected).pop()).price
      if (venteEnCrypto <= possessionEnCrypto) {
        this.holdings[this.holdings.indexOf(this.holdings.filter(crypto => crypto.name === this.cryptoSelected).pop())].somme -= venteEnCrypto
        this.holdingDolls += this.vente
        localStorage.setItem('holdingsOf' + this.login, JSON.stringify(this.holdings))
        localStorage.setItem('HoldingDollsOf' + this.login, JSON.stringify(this.holdingDolls))
      } else {
        // erreur
      }
    }
  }
}
</script>

<style>

</style>
