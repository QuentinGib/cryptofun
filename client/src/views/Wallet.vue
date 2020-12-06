<template>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Porte Monnaie</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300i,400" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link rel="stylesheet" href="./css/main.css">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <div class="card">
      <h3 class="title">
        Valeur totale<br>
        <br><br><br>{{sommeTotale}} $
      </h3>
      <div class="bar">
        <div class="emptybar"></div>
        <div class="filledbar"></div>
      </div>
    </div>
    <div class="card">
      <h3 class="title">
        Monnaie disponible<br>
        <br><br>{{ holdingDolls }} $
      </h3>
      <div class="bar">
        <div class="emptybar"></div>
        <div class="filledbar"></div>
      </div>
    </div>
    <div class="card">
      <h3 class="title">Cryptos disponibles</h3>
      <ul class="cryptodispo">
        <li v-for="hold in holdingsNotNull" :key="hold.id">
          <p>{{ hold.name }}  {{ hold.somme }}</p>
        </li>
      </ul>
      <div class="circle">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle class="stroke" cx="30" cy="30" r="20"/>
      </svg>
      </div>
    </div>
  </div>
  <div class="wallet-block2">
    <div class="wallet-AchatRevente">
      <h2>Trading :</h2>
      <ul>
        <form @submit.prevent="acheter" class="form-achat">
          <select v-model="cryptoSelected">
            <option
              v-for="(currency, idx) in currencies"
              v-bind:key="currency.id + idx"
              :value="currency.name"
            >
              {{ currency.name }}
            </option>
          </select>
          <p class="text-achat">
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
    this.holdingDolls = JSON.parse(localStorage.getItem('HoldingDollsOf' + this.login)) || 1000
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
        this.sommeTotale = Math.round(sum * 1000) / 1000
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
.container {
  font-family: 'Open Sans', sans-serif;
  position: absolute;
  height: 500px;
  width: 1000px;
  top: 150px;
  left: 20%;
  display: flex;
}

.card {
  display: flex;
  height: 420px;
  width: 300px;
  background-color: #17141d;
  border-radius: 10px;
  box-shadow: -1rem 0 3rem #000;
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;
}

.card:not(:first-child) {
    margin-left: -50px;
}

.card:hover {
  transform: translateY(-20px);
  transition: 0.4s ease-out;
}

.card:hover ~ .card {
  position: relative;
  left: 50px;
  transition: 0.4s ease-out;
}

.title {
  color: white;
  font-weight: 300;
  position: absolute;
  left: 20px;
  top: 15px;
}

.bar {
  position: absolute;
  top: 300px;
  left: 20px;
  height: 10px;
  width: 250px;
}

.emptybar {
  background-color: #2e3033;
  width: 100%;
  height: 100%;
}

.filledbar {
  position: absolute;
  top: 0px;
  z-index: 3;
  width: 0px;
  height: 100%;
  background: rgb(0,154,217);
  background: linear-gradient(90deg, rgba(0,154,217,1) 0%, rgba(217,147,0,1) 65%, rgba(255,186,0,1) 100%);
  transition: 0.6s ease-out;
}

.card:hover .filledbar {
  width: 210px;
  transition: 0.4s ease-out;
}

.circle {
  position: absolute;
  top: 350px;
  left: calc(80% - 20px);
}

.stroke {
  stroke: white;
  stroke-dasharray: 360;
  stroke-dashoffset: 360;
  transition: 0.6s ease-out;
}

svg {
  fill: #17141d;
  stroke-width: 1.7px;
}

.card:hover .stroke {
  stroke-dashoffset: 260;
  transition: 0.6s ease-out;
}
</style>
