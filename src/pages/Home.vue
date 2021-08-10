<template>
<div class="main">
  <div class="header">
    <nav>
      <a href=""><img src="../assets/img/logo.png"></a>
      <ul class="nav-link">
        <li><a href="">
          <img src="../assets/img/Group.png" alt=""></a>
        </li>
        <li><a href="/">Home</a></li>
        <li><a href="">Courses</a></li>
        <li class="nav-register">
          <a href="">Register <img src="../assets/img/Polygon.png"></a>
          <ul class="dropdown">
            <li><a href="">Intructor Registration</a></li>
            <hr>
            <li><a href="">Student Registration</a></li>
          </ul>
        </li>
        <li><a>
          <button  @click="show = !show" id="btnlog">Login</button>
        </a></li>
      </ul>
    </nav>
  </div>
  <div class="content">
    <Login :active.sync="show" @submit="event => login(event)" v-if="show"></Login>
  </div>
</div>
</template>

<script>
import Login from '../components/Login.vue'
// import axios from 'axios'
export default {
  name: 'Home',
  methods: {
    login (event) {
      this.show = event
    }
  },
  data () {
    return {
      show: false
    }
  },
  components: {
    Login
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  padding: 0;
  margin: 0;
}
.main{
  width: 100%;
  height: 998px;
  box-sizing: border-box;
  position: relative;
}
.content{
  position: absolute;
  width: 100%;
  height: 928px;
  left: 0px;
  top: 70px;
  background: url('../assets/img/home_background.png');
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: cover;
}
.header{
  padding: 0 2%;
  background-color: #fff;
  width: 100%;
  height: 70px;
  left: 0px;
  top: 0px;
  font-weight: 400;
}
nav>a{
  text-decoration: none;
  color: #333;
  font-size: 30px;
  font-weight: bold;
}
nav{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-link{
  padding: 28px 0;
  line-height: 23.44px;
}
.nav-link li{
  display: inline-block;
  margin: 0 15px;
}
.nav-link li a{
  text-decoration: none;
  color: #333;
  padding: 5px 0;
  font-size: 20px;
}
.nav-register{
  position: relative;
}
.dropdown{
  position: absolute;
  display: none;
  background: #fff;
  width: 220px;
  height: 97px;
  text-align: center;
  border: 1px solid rgb(218, 214, 214);
  margin-left: -60px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.dropdown>li{
  display: flex;
  align-items: center;
  justify-items: center;
  margin-top: 10px;
}
#btnlog{
  background: none;
  border: none;
}
.nav-register:hover .dropdown{
  display: block;
  z-index: 1;
}
hr{
  color: black;
  margin-left: -1px;
  margin-top: 4px;
}
</style>
