<template>
<v-app>
<h1>Översikt</h1>
<p>Saldo: {{ Math.round((saldo + Number.EPSILON) * 100) / 100 }}kr</p>
<v-btn @click="$router.push('account/balance')" primary large color="green">Gör en insättning</v-btn>
<v-btn @click="$router.push('stocks')" primary large color="orange">Köp aktier</v-btn>
<v-card dark>
  <v-card-title>Innehav</v-card-title>
 <v-simple-table class="table" dark loading
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
          <th class="text-left">
            Inköpspris
          </th>
          <th class="text-left">
            Marknadsvärde
          </th>
          <th class="text-left">
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
          <td>{{ stocks.name }}</td>
          <td>{{ stocks.amount }}st</td>
          <td>{{ Math.round((stocks.price * stocks.amount + Number.EPSILON) * 100) / 100 }}kr</td>
          <td>{{ Math.round((stocks.live * stocks.amount + Number.EPSILON) * 100) / 100 }}kr</td>
          <td>{{ Math.round(((stocks.live * stocks.amount) - (stocks.price * stocks.amount) + Number.EPSILON) * 100) / 100 }}kr</td>
          <td><v-btn @click="$router.push('stocks/sell/' + stocks.name)" primary small color="orange">Sälj</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <v-card-title>Totalt värde: {{ Math.round((sum + Number.EPSILON) * 100) / 100 }}kr</v-card-title>
  </v-card>
</v-app>
</template>
<script>
import io from 'socket.io-client';
import auth from '../components/token.js'
import acc from '../components/acc.js'
export default {
  data() {
    return {
      socket: io.connect("http://trading-api.gustavbergh.me"),
      texts: '',
      saldo: 0,
      portfolio: [],
      sum: 0
    }
  },
  mounted() {
    this.getAcc();
    let that = this;
    this.socket.on('stocks', (stocks) => {
      this.sum = 0
      stocks.forEach(stock => {
        this.portfolio.forEach(function (asd) {
          if (stock.name === asd.name) {
            that.$set(asd, 'live', stock.price)
            that.sum += (asd.amount * stock.price)
          }
        });
      });
    });
  },
  methods: {
    getAcc() {
      let that = this;
      let data = {
        usr: acc.acc
      }
      fetch('http://trading-api.gustavbergh.me/acc', {
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
}
.table {
  margin: auto;
  opacity: 0.9;
}

.v-btn {
  margin: 2rem auto;
  width: 50%;
}
</style>
