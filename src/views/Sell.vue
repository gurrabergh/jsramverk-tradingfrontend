<template>
<v-app>
<h1>Sälj {{ stockName }}</h1>
<v-form><p class="error">{{ error }}</p><p>Antal aktier på kontot: {{ owned }}st</p>
  <v-text-field
  hide-details
  readonly
  label="Pris"  type="number"
  v-model="price"
/><v-text-field type="number" name="" label="Antal aktier" required max="4" v-on:input="updateSum" v-model="amount"></v-text-field><v-text-field
  hide-details
  readonly
  label="Summa"  type="number"
  v-model="sum"
/><v-btn v-on:click="purchase" primary large block>Sälj</v-btn></v-form>

</v-app>
</template>
<script>
import auth from '../components/token.js'
import acc from '../components/acc.js'

export default {
  data() {
    return {
      amount: '',
      sum: 0,
      price: 0,
      stockName: this.$route.params.stock,
      error: '',
      balance: acc.balance,
      index: 0,
      owned: 0
    }
  },
  mounted() {
    this.index = acc.portfolio.findIndex(x => x.name === this.$route.params.stock);
    this.price = acc.portfolio[this.index].live
    this.owned = acc.portfolio[this.index].amount
    this.balance = acc.balance
  },
  methods: {
    updateSum() {
      this.sum = parseFloat(this.amount) * parseFloat(this.price)
      this.price = acc.portfolio[this.index].live
      this.balance = acc.balance
    },
    purchase() {
      if (this.amount <= acc.portfolio[this.index].amount) {
        let balance = parseFloat(acc.balance) + this.sum
        
        if (parseInt(this.amount) === parseInt(acc.portfolio[this.index].amount)) {  
            acc.portfolio.splice(this.index, 1)
          } else {
            acc.portfolio[this.index].amount = parseInt(acc.portfolio[this.index].amount) - parseInt(this.amount)
          }
        let data = {
        stock: this.$route.params.stock,
        id: acc.acc,
        portfolio: acc.portfolio,
        balance: balance
        }
        fetch('http://trading-api.gustavbergh.me/purchase', {
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
        this.error = 'Du har inte tillräckligt många aktier.'
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
