<template>
<v-app>
  <div class="home">
   <h1>a12o Trading</h1>
     <v-btn
              x-large
              color="success"
              dark
              id="login"
              @click="$router.push('login')" 
            >
              Logga in
            </v-btn>
      <v-btn
              color="gray"
              dark
              x-large
              id="register"
              @click="$router.push('register')" 
            >
              Registrera dig
            </v-btn>
  </div>  
</v-app>
</template>
<script>
export default {
  name: 'Home',
  props: { },
  data() {
    return {
        text: "",
        head: ""
    }
  }
}
</script>
<style>
#app {
 background: url('~@/assets/bg.png') no-repeat center center fixed;
 -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
<style scoped>

.v-btn {
  margin: 2rem auto;
  width: 40%;
  display: block;
}

</style>