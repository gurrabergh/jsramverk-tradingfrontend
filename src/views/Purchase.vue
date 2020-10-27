<template>
<v-app>
<h1>Köp {{ stockName }}</h1>
<v-form><p class="error">{{ error }}</p><p>Tillgängligt saldo: {{ Math.round((balance + Number.EPSILON) * 100) / 100 }}kr</p>
  <v-text-field
  hide-details
  readonly
  label="Pris"  type="number"
  v-model="price"
/><v-text-field type="number" name="" label="Antal aktier" required v-on:input="updateSum" v-model="amount"></v-text-field><v-text-field
  hide-details
  readonly
  label="Summa"  type="number"
  v-model="sum"
/><v-btn v-on:click="purchase" primary large block>Köp</v-btn></v-form>

</v-app>
</template>
<script>
import auth from '../components/token.js'
import acc from '../components/acc.js'
import stockList from '../components/stocks.js'

export default {
  data() {
    return {
      amount: '',
      sum: 0,
      price: stockList.stocks[0].price,
      stockName: this.$route.params.stock,
      error: '',
      balance: acc.balance,
      index: 0
    }
  },
  mounted() {
    this.index = stockList.stocks.findIndex(x => x.name === this.$route.params.stock);
    this.price = stockList.stocks[this.index].price
    this.balance = acc.balance
  },
  methods: {
    updateSum() {
      this.sum = parseFloat(this.amount) * parseFloat(this.price)
      this.price = stockList.stocks[this.index].price
      this.balance = acc.balance
    },
    purchase() {
      if (this.sum < acc.balance) {
        let balance = parseFloat(acc.balance) - this.sum
        let index = acc.portfolio.findIndex(x => x.name === this.$route.params.stock)
        console.log(index)
        if (index === -1) {  
            acc.portfolio.push({name: this.stockName, amount: this.amount, price: this.price})
          } else {
            let sum1 = parseInt(acc.portfolio[index].amount) * parseFloat(acc.portfolio[index].price)
            let sum2 = parseFloat(this.price) * parseFloat(this.amount)
            let gav = (sum1 + sum2) / (parseInt(this.amount) + parseInt(acc.portfolio[index].amount))
            acc.portfolio[index].amount = parseInt(acc.portfolio[index].amount) + parseInt(this.amount)
            acc.portfolio[index].price = gav
          }
        let data = {
        stock: this.$route.params.stock,
        id: acc.acc,
        portfolio: acc.portfolio,
        balance: balance
        }
        fetch('https://trading-api.gustavbergh.me/purchase', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        "x-access-token": auth.token
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.msg == 'success') {
            this.$router.push('/account')
          }
        })
      } else {
        this.error = 'Sätt in pengar för att genomföra transaktionen.'
      }
    }
  }
}
</script>

<style>
form {
  text-align: center;
}
.v-btn {
  margin-top: 2rem;
}
</style>
