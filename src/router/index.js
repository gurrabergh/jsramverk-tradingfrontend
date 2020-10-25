import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Account from '../views/Account.vue'
import Balance from '../views/Balance.vue'
import Stocks from '../views/Stocks.vue'
import Purchase from '../views/Purchase.vue'
import Sell from '../views/Sell.vue'
import auth from '../components/token.js'
import Logout from '../views/Logout.vue'
// import Chatt from '../views/Chatt.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MeS',
    component: Home
  },
  {
  path: '/login',
  name: 'Login',
  component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/account/balance',
    name: 'Balance',
    component: Balance,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stocks/purchase/:stock',
    name: 'Purchase',
    component: Purchase,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stocks/sell/:stock',
    name: 'Sell',
    component: Sell,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const authenticatedUser = auth.token;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && ! authenticatedUser) next('/login')
    else next();
});

export default router
