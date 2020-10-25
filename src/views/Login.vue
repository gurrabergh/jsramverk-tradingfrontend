<template>
<v-app>
<h1>Logga in</h1>
<v-form>
  <v-text-field name="Username" label="E-mail" v-model="usr"></v-text-field>
            <v-text-field name="Password" label="Lösenord" type="password" v-model="psw"></v-text-field>
              <v-btn v-on:click="submitted" primary large block>Login</v-btn>      <v-btn
              color="blue"
              dark
              large
              v-on:click="register"
              class="register"
            >
              Registrera dig
            </v-btn></v-form>
              
</v-app>
</template>
<script>
import auth from '../components/token.js'
import acc from '../components/acc.js'
export default {
  data() {
    return {
      usr: "",
      psw: ""
    }
  },
  methods: {
    submitted() {
      let data = {
        usr: this.usr,
        psw: this.psw
      }
      fetch('http://trading-api.gustavbergh.me/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if (data.data.token) {
          auth.token = data.data.token
          acc.acc = this.usr
            this.$router.push('/account')
        }
      })
    },
    register() {
      this.$router.push('register')
    },
  }
}
</script>
<style>
.register {
  margin-top: 2rem;
}
.v-form {
  width: 50%;
  margin: auto;
}
</style>