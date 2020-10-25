<template>
<v-app>
<h1>Gör en insättning</h1>
<v-form><v-text-field
  v-model="balance"
  hide-details
  single-line
  type="number"
  label="Ange summa"
/><v-btn v-on:click="submit" primary large block>Sätt in</v-btn></v-form>

</v-app>
</template>
<script>
import auth from '../components/token.js'
import acc from '../components/acc.js'
export default {
  data() {
    return {
      balance: ""
    }
  },
  methods: {
    submit() {
      let data = {
        balance: this.balance,
        id: acc.acc
      }
      fetch('http://localhost:1337/balance', {
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
    }
  }
}
</script>

<style>
legend {
    font-size: 24px;
}

input[type=text] {
    width: 100%;
    margin: 8px auto;
    box-sizing: border-box;
    padding: 12px 20px;
}

input[type=submit] {
    width: 200px;
    font-size: 16px;
    padding: 10px 0;
}

select {
    width: 30%;
    margin: 8px 0;
    padding: 3px 4px;
    display: block;
}

textarea {
    display: block;
    margin: 12px auto;
    width: 30%;
    height: 150px;
}
</style>
