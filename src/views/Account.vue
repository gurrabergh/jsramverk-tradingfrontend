<template>
<v-app  v-resize="onResize">
<h1>Översikt</h1>
<p>Saldo: {{ Math.round((saldo + Number.EPSILON) * 100) / 100 }}kr</p>
<v-btn id="balance" @click="$router.push('account/balance')" primary large color="green">Gör en insättning</v-btn>
<v-btn id="stocks" @click="$router.push('stocks')" primary large color="orange">Köp aktier</v-btn>
<v-card dark>
  <v-card-title>Innehav</v-card-title>
 <v-simple-table class="table" dark loading dense
    loading-text="Loading... Please wait">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Aktie
          </th>
          <th class="text-left">
            Antal
          </th>
          <th class="text-left" v-if="!isMobile">
            Inköpspris
          </th>
          <th class="text-left">
            Marknadsvärde
          </th>
          <th class="text-left" v-if="!isMobile">
            Förändring
          </th>
          <th class="text-left">
            Sälj
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="stocks in portfolio"
          :key="stocks.name"
        >
          <td class="text-left">{{ stocks.name }}</td>
          <td class="text-left">{{ stocks.amount }}st</td>
          <td class="text-left" v-if="!isMobile">{{ Math.round((stocks.price * stocks.amount + Number.EPSILON) * 100) / 100 }}kr</td>
          <td class="text-left">{{ Math.round((stocks.live * stocks.amount + Number.EPSILON) * 100) / 100 }}kr</td>
          <td class="text-left" v-if="!isMobile">{{ Math.round(((stocks.live * stocks.amount) - (stocks.price * stocks.amount) + Number.EPSILON) * 100) / 100 }}kr</td>
          <td class="text-left"><v-btn @click="$router.push('stocks/sell/' + stocks.name)" primary small color="orange">Sälj</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <v-card-title> <p>Inköpsvärde: {{ Math.round((startSum + Number.EPSILON) * 100) / 100 }}kr</p><p>Nuvarande värde: {{ Math.round((sum + Number.EPSILON) * 100) / 100 }}kr</p><p>Förändring {{ Math.round(((sum - startSum) + Number.EPSILON) * 100) / 100 }}kr</p></v-card-title>
  </v-card>
</v-app>
</template>
<script>
import io from 'socket.io-client';
import auth from '../components/token.js'
import acc from '../components/acc.js'
import stockList from '../components/stocks.js'

export default {
  data() {
    return {
      socket: io.connect("https://trading-api.gustavbergh.me"),
      texts: '',
      saldo: 0,
      portfolio: [],
      sum: 0,
      startSum: 0
    }
  },
  mounted() {
    this.getAcc();
    let that = this;
    this.socket.on('stocks', (stocks) => {
      stockList.stocks = stocks
      this.sum = 0
      this.startSum = 0
      stocks.forEach(stock => {
        this.portfolio.forEach(function (pstock) {
          if (stock.name === pstock.name) {
            that.$set(pstock, 'live', stock.price)
            that.sum += (pstock.amount * stock.price)
            that.startSum += (pstock.amount * pstock.price)
          }
        });
      });
    });
  },
  methods: {
    onResize() {
          if (window.innerWidth < 769)
            this.isMobile = true;
          else
            this.isMobile = false;
        },
    getAcc() {
      let that = this;
      let data = {
        usr: acc.acc
      }
      fetch('https://trading-api.gustavbergh.me/acc', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      "x-access-token": auth.token
      },
      body: JSON.stringify(data)
      })
     .then(function(response) {
          return response.json();
      })
      .then(function(result) {
        that.saldo = result.data[0].balance
        acc.balance = result.data[0].balance
        that.portfolio = result.data[0].portfolio
        acc.portfolio = result.data[0].portfolio

      });
    }
  }
}
</script>


<style scoped>
.v-card {
  width: 75%;
  margin: auto;
}
.table {
  margin: auto;
  opacity: 0.9;
}

.v-btn {
  margin: 2rem auto;
  width: 50%;
}

.v-card__title p {
      margin: auto;
    }

.graphs div {
    margin-bottom: 2em;
}

@media screen and (max-width: 1024px) {
    .v-card {
      width: 100%;
      display: block;
    }
    .v-card__title {
      width: 100%;
      display: block;
      margin: auto;
    }
    #app {
        width: 98%;
        margin: 2em 2% 0;
        padding: 1em;
    }

    .table {
      width: 100%;
    }
}
</style>
