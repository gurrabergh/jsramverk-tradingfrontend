<template>
<v-container @click="close">
  <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      dark
      class="ma-0"
    >
      <v-list
        nav
        three-line
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item id="accNav" @click="$router.push('/account')">
            <v-list-item-title>Konto</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push('/account/balance')">
            <v-list-item-title>Insättning</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push('/stocks')">
            <v-list-item-title>Köp Aktier</v-list-item-title>
          </v-list-item>

           <v-list-item @click="$router.push('/logout')" v-if="loggedIn">
            <v-list-item-title>Logga ut</v-list-item-title>
          </v-list-item>



        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>  
  <v-app-bar-nav-icon @click.stop="drawer = !drawer" @click="isLoggedIn"></v-app-bar-nav-icon >
</v-container>
</template>

<script>
import auth from '../components/token.js'
  export default {
    name: 'Nav',
    data: () => ({
      drawer: false,
      group: null,
      loggedIn: ''
    }),
    methods: {
      close() {
        this.drawer = false
      },
      isLoggedIn() {
        if (auth.token) {
          this.loggedIn = true
        } else {
          this.loggedIn = false
        }
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>

<style>
v-list-item-title {
  font-size: 2rem;
}
.container {
  text-align: left;
  min-width: 100%
}
</style>