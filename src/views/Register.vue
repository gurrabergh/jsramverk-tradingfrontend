<template>
<v-app>
  <h1>Registrera en ny användare</h1>
 <v-form>
  <v-text-field name="Username" label="E-mail" v-model="usr"></v-text-field>
            <v-text-field name="Password" label="Lösenord" type="password" v-model="psw"></v-text-field>
              <v-btn v-on:click="submitted" primary large block>Registrera</v-btn></v-form>
</v-app>
</template>
<script>
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
      fetch('http://trading-api.gustavbergh.me/register', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  .then(response => response.json())
  .then(data => {
    if (data.data.msg == 'success') {
          this.$router.push('/login')
    }
  })
  }
  }
}
</script>
<style>
.v-form {
  width: 50%;
  margin: auto;
}
</style>