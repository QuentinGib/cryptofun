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
            <li v-for="hold in holdingsNotNull" :key="hold.id">
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
                <option v-for="currency in holdingsNotNull" v-bind:key="currency.id" >
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
      holdingsNotNull: [],
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
      .catch(error => {
        this.error = error
        this.$router.push({ name: 'porte_monnaie', query: { redirect: '/porte_monnaie' } })
      })

    fetch('/api/v1/compte/holdings', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(({ currencies }) => {
        this.holdings = JSON.parse(localStorage.getItem('holdingsOf' + this.login)) || this.currencies.slice(0, 11).map(currency => ({
          id: currency.id,
          symbol: currency.symbol,
          name: currency.name,
          somme: 0
        }))
        this.holdingsNotNull = this.holdings.filter(crypto => crypto.somme > 0)
        let sum = +this.holdingDolls
        for (const cryptoHolded of this.holdings) {
          sum += this.currencies.find(x => x.id === cryptoHolded.id).price * cryptoHolded.somme
        }
        console.log(this.sommeTotale)
        this.sommeTotale = sum
      })
      .catch(error => { this.error = error })
  },

  methods: {
    acheter () {
      this.currencies = JSON.parse(localStorage.getItem('prices'))
      if (this.holdingDolls >= this.achat) {
        this.holdings[this.holdings.indexOf(this.holdings.find(crypto => crypto.name === this.cryptoSelected))].somme += this.achat / this.currencies.find(crypto => crypto.name === this.cryptoSelected).price
        this.holdingDolls -= this.achat
        localStorage.setItem('holdingsOf' + this.login, JSON.stringify(this.holdings))
        localStorage.setItem('HoldingDollsOf' + this.login, JSON.stringify(this.holdingDolls))
        window.location.reload()
      } else {
        // erreur
      }
    },

    vendre () {
      const possessionEnCrypto = this.holdings.find(choixCrypto => choixCrypto.name === this.cryptoSelected).somme
      const venteEnCrypto = this.vente / this.currencies.find(crypto => crypto.name === this.cryptoSelected).price
      if (venteEnCrypto <= possessionEnCrypto) {
        this.holdings[this.holdings.indexOf(this.holdings.find(crypto => crypto.name === this.cryptoSelected))].somme -= venteEnCrypto
        this.holdingDolls += this.vente
        localStorage.setItem('holdingsOf' + this.login, JSON.stringify(this.holdings))
        localStorage.setItem('HoldingDollsOf' + this.login, JSON.stringify(this.holdingDolls))
        window.location.reload()
      } else {
        // erreur
      }
    }
  }
}
</script>

<style>

</style>
