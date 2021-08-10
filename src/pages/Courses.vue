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
            <hr class="hr1">
            <li><a href="">Student Registration</a></li>
          </ul>
        </li>
        <li class="nav-pro">
          <a href="/myprofile"><img src="../assets/img/Anhavatardoi.png" alt="" class="nav-avatar"><strong>{{ firstname }} {{ lastname }}</strong></a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="content">
  <div class="content-left">
      <div class="form-group">
        <form action="">
        <input type="text" placeholder="Search.." class="search">
        <button type="submit" class="btn-search"><img src="../assets/img/Group.png" alt=""></button>
        </form>
      </div>
      <div class="form-group group1">
        <form>
            <p>Level</p>
            <div class="i1">
                <input type="radio" checked>All
            </div><br>
            <div class="i1">
                <input type="radio" >Beginner
            </div><br>
            <div class="i1">
                <input type="radio" >Intermediate
            </div><br>
            <div class="i1">
                <input type="radio" >Expert
            </div><br>
            <div class="i1">
                <input type="radio" >Master
            </div>
        </form>
      </div>
      <div class="form-group group2">
        <form>
            <p>Category:</p>
            <div class="i2">
                <input type="radio" checked>All
            </div><br>
            <div class="i2">
                <input type="radio" >Art & Culture
            </div><br>
            <div class="i2">
                <input type="radio" >Biology & Sciences
            </div><br>
            <div class="i2">
                <input type="radio" >Business & Management
            </div>
        </form>
      </div>
      <hr class="hr2">
  </div>
  <div class="content-right">
  </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Courses',
  created () {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/')
    }
  },
  mounted () {
    axios.get('http://localhost:3000/user', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(res => {
        this.id = localStorage.getItem('token')
        this.firstname = res.data.user.firstname
        this.lastname = res.data.user.lastname
      })
  },
  methods: {
  },
  data () {
    return {
      firstname: '',
      lastname: ''
    }
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
/* content */
.content{
  position: absolute;
  width: 100%;
  height: 928px;
  left: 0px;
  color: black;
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: cover;
}
/* content left */
.content-left{
    float: left;
    width: 360px;
    height: 400px;
    margin-top: 15px;
}
.search{
    position: absolute;
    width: 300px;
    height: 44.12px;
    left: calc(50% - 300px/2 - 560px);
    top: calc(50% - 44.12px/2 - 420.94px);
    background: #FFFFFF;
    border: 1px solid #C2C2C2;
    box-shadow: 0px 4px 4px rgb(194 194 194 / 50%);
    border-radius: 5px;
    transform: matrix(1, 0, 0, 1, 0, 0);
    padding-left: 10px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 15px;
    color: #000000;
}
.btn-search{
    position: absolute;
    left: 21%;
    right: 77.43%;
    top: 3.24%;
    bottom: 93.64%;
    border: none;
    background: none;
}
.group1{
    position: absolute;
    width: 300px;
    left: calc(50% - 300px/2 - 560px);
    top: 90px;
    height: 210px;
    bottom: 666px;
    background: #FFFFFF;
    border: 1px solid #C2C2C2;
    box-shadow: 0px 4px 4px rgb(194 194 194 / 50%);
    border-radius: 5px;
    transform: matrix(1, 0, 0, 1, 0, 0);
}
.group1 p {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    margin: 10px 15px;
}
.group1 .i1{
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    line-height: 15px;
    margin: 0 20px;
}
.i1 input{
    margin: 4px 5px 0;
}

.group2{
    position: absolute;
    width: 300px;
    left: calc(50% - 300px/2 - 560px);
    top: 330px;
    height: 230px;
    bottom: 666px;
    background: #FFFFFF;
    border: 1px solid #C2C2C2;
    box-shadow: 0px 4px 4px rgb(194 194 194 / 50%);
    border-radius: 5px;
    transform: matrix(1, 0, 0, 1, 0, 0);
}
.group2 p {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    margin: 10px 0;
    border-bottom: 1px solid #C4C4C4;
    width: 100%;
    padding: 0 15px 10px;
}
.group2 .i2{
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    line-height: 15px;
    border-bottom: 1px solid #C4C4C4;
    width: 100%;
    padding: 0 15px 10px;
}
.i2 input{
    margin: 4px 5px 0;
}
.hr2{
    position: absolute;
    width: 904px;
    height: 0px;
    left: calc(50% - 300px/2 - 685px);
    top: calc(50% - 0px/2 + 5px);
    border: 1px solid #C2C2C2;
    transform: rotate(90deg);
}
/* header */
.header{
  padding: 0 2%;
  background-color: #fff;
  width: 100%;
  height: 80px;
  left: 0px;
  top: 0px;
  font-weight: 400;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
.nav-avatar{
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-top: -10px;
  margin-right: 5px;
}
/* button register */
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
.nav-register:hover .dropdown{
  display: block;
  z-index: 1;
}
.hr1{
  color: black;
  margin-left: -1px;
  margin-top: 4px;
}

</style>
