<template>
    <body>
      <div class="container">
        <div class="card">
          <h3 class="title">
            Valeur totale<br />
            <br /><br /><br />{{ sommeTotale }} $
          </h3>
          <div class="bar">
            <div class="emptybar"></div>
            <div class="filledbar"></div>
          </div>
        </div>
        <div class="card">
          <h3 class="title">
            Monnaie disponible<br />
            <br /><br />{{ holdingDolls }} $
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
              <p>{{ hold.name }} {{ hold.somme }}</p>
            </li>
          </ul>
          <div class="circle">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle class="stroke" cx="30" cy="30" r="20" />
            </svg>
          </div>
        </div>
      </div>
      <div class="wallet-block2">
        <div class="wallet-AchatRevente">
          <h2 style="color: #bdbdbd">Trading :</h2>
          <ul>
            <form @submit.prevent="acheter" class="form-achat">
              <div class="box">
                <select v-model="cryptoSelected">
                  <option
                    v-for="(currency, idx) in tradeCurrencies"
                    v-bind:key="currency.id + idx"
                    :value="currency.name"
                  >
                    {{ currency.name }}
                  </option>
                </select>
              </div>
              <p class="text-achat">
                <label for="achat" style="color: #bdbdbd">
                  pour un montant de $
                </label>
                <input
                  id="achat"
                  v-model.number="achat"
                  type="number"
                  class="app-form-control"
                />
              </p>
              <button type="submit" class="button-achat">Acheter</button>
            </form>
            <form @submit.prevent="vendre">
              <div class="box">
                <select v-model="cryptoSelected">
                  <option
                    v-for="currency in holdingsNotNull"
                    v-bind:key="currency.id"
                  >
                    {{ currency.name }}
                  </option>
                </select>
              </div>
              <p>
                <label for="vente" style="color: #bdbdbd">
                  pour un montant de $
                </label>
                <input
                  id="vente"
                  v-model.number="vente"
                  type="number"
                  class="app-form-control"
                />
              </p>
              <button type="submit" class="button-vendre">Vendre</button>
            </form>
          </ul>
        </div>
      </div>
    </body>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Wallet',

  data () {
    return {
      achat: 0,
      vente: 0,
      login: '',
      cryptoSelected: ''
    }
  },

  computed: mapState(['tradeCurrencies', 'holdings', 'sommeTotale', 'holdingsNotNull', 'holdingDolls']),

  mounted () {
    const token = localStorage.getItem('token')
    this.login = this.$store.state.user
    this.$store.commit('setHoldingsDolls', 0)

    this.$store.dispatch('cryptoTrade', token)
    console.log('tradeCurrencies ', this.tradeCurrencies,
      ' holdings ', this.holdings,
      ' sommeTotale ', this.sommeTotale,
      ' holdingsNotNull ', this.holdingsNotNull,
      ' holdingDolls ', this.holdingDolls)
  },

  methods: {
    acheter () {
      if (this.holdingDolls >= this.achat) {
        this.holdings[
          this.holdings.indexOf(
            this.holdings.find((crypto) => crypto.name === this.cryptoSelected)
          )
        ].somme +=
          this.achat /
          this.tradeCurrencies.find((crypto) => crypto.name === this.cryptoSelected)
            .price
        this.holdingDolls -= this.achat
        this.$store.commit('setHoldings', this.holdings)
        this.$store.commit('setHoldingsDolls', this.achat)
        window.location.reload()
      } else {
        alert("Erreur lors de l'achat")
      }
    },

    vendre () {
      const possessionEnCrypto = this.holdings.find(
        (choixCrypto) => choixCrypto.name === this.cryptoSelected
      ).somme
      const venteEnCrypto =
        this.vente /
        this.tradeCurrencies.find((crypto) => crypto.name === this.cryptoSelected)
          .price
      if (venteEnCrypto <= possessionEnCrypto) {
        this.holdings[
          this.holdings.indexOf(
            this.holdings.find((crypto) => crypto.name === this.cryptoSelected)
          )
        ].somme -= venteEnCrypto
        this.holdingDolls += this.vente
        this.$store.commit('setHoldings', this.holdings)
        this.$store.commit('setHoldingsDolls', this.vente)
        window.location.reload()
      } else {
        alert('Erreur lors de la vente')
      }
    }
  }
}
</script>

<style>
.container {
  font-family: "Open Sans", sans-serif;
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
  background: rgb(0, 154, 217);
  background: linear-gradient(
    90deg,
    rgba(0, 154, 217, 1) 0%,
    rgba(217, 147, 0, 1) 65%,
    rgba(255, 186, 0, 1) 100%
  );
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

/*#region Trading*/

.box select {
  background-color: #4d4d4f;
  color: white;
  padding: 12px;
  width: 250px;
  border: none;
  font-size: 20px;
  box-shadow: none;
  -webkit-appearance: button;
  appearance: button;
  outline: none;
}

.box::before {
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  text-align: center;
  font-size: 28px;
  line-height: 45px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.box:hover::before {
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.2);
}

.box select option {
  padding: 30px;
}

.app-form-control {
  width: 100%;
  padding: 10px 0;
  background: none;
  border: none;
  border-bottom: 1px solid #666;
  color: #ddd;
  font-size: 14px;
  text-transform: uppercase;
  outline: none;
  transition: border-color 0.2s;
}

.app-form-control::placeholder {
  color: #666;
}

.app-form-control:focus {
  border-bottom-color: #ddd;
}

.button-achat {
  cursor: pointer;
  outline: none;
  border: none;
  background-color: #007c00;
  width: 150px;
  height: 35px;
  border-radius: 15px;
  color: white;
  background-size: 100% 100%;
  box-shadow: 0 0 0 7px var(--light) inset;
  margin-bottom: 60px;
}

.button-vendre {
  cursor: pointer;
  outline: none;
  border: none;
  background-color: #c61501;
  width: 150px;
  height: 35px;
  border-radius: 15px;
  color: white;
  background-size: 100% 100%;
  box-shadow: 0 0 0 7px var(--light) inset;
  margin-bottom: 15px;
}

/*#endregion Trading*/
</style>
