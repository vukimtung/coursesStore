import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Register from '../pages/Register'
import HomePage from '../pages/HomePage'
import Courses from '../pages/Courses.vue'
import TestVuex from '../testvuex/TestVuex.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/myprofile',
      name: 'Myprofile',
      component: HomePage
    },
    {
      path: '/courses',
      name: 'Courses',
      component: Courses
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/testvuex',
      name: 'TestVuex',
      component: TestVuex
    }
  ]
})
