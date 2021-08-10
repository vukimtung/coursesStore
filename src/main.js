// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelidate from 'vuelidate'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueRouter from 'vue-router'
import Register from './pages/Register.vue'
import Home from './pages/Home.vue'
import HomePage from './pages/HomePage.vue'
import Courses from './pages/Courses.vue'
import TestVuex from './testvuex/TestVuex.vue'
import { store } from './store/store'

const routes = [
  {path: '/', component: Home},
  {path: '/myprofile', component: HomePage},
  {path: '/register', component: Register},
  {path: '/login', component: Home},
  {path: '/courses', component: Courses},
  {path: '/testvuex', component: TestVuex},
  // nếu không sẽ chuyển đến trang home
  { path: '*', redirect: '/' }
]

export const Router = new VueRouter({
  mode: 'history',
  routes
})

Vue.use(Vuelidate)
Vue.use(VueRouter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Router,
  store,
  render: h => {
    return h(App)
  }
})
