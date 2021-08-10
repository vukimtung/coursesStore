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
    <!-- <ul v-for="(u,index) in dulieu[0]" :key="index">
      <li>{{u.email}}</li>
      <li>{{u.username}}</li>
    </ul> -->
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <label class="register">Register and Start Learning!</label>
            <div class="form-row">
              <div class="form-group col-md-6 firstname">
                <input class="i-firstname form-control" type="text" placeholder="First Name" v-model.trim="$v.firstname.$model" :class="{'is-invalid' :$v.firstname.$error, 'is-valid' :!$v.firstname.$invalid}" required>
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">
                  <span v-if="!$v.firstname.required">Vui lòng nhập FirstName.</span>
                  <span v-if="!$v.firstname.minLength">FirstName phải ít nhất {{$v.firstname.$params.minLength.min}} ký tự</span>
                  <span v-if="!$v.firstname.maxLength">FirstName không quá {{$v.firstname.$params.maxLength.max}} ký tự</span>
                </div>
              </div>
              <div class="form-group col-md-6 lastname">
                <input class="i-lastname form-control" type="text" placeholder="Last Name" v-model.trim="$v.lastname.$model" :class="{'is-invalid' :$v.lastname.$error, 'is-valid' :!$v.lastname.$invalid}" required>
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">
                  <span v-if="!$v.lastname.required">Vui lòng nhập LastName.</span>
                  <span v-if="!$v.lastname.minLength">LastName phải ít nhất {{$v.lastname.$params.minLength.min}} ký tự</span>
                  <span v-if="!$v.lastname.maxLength">LastName không quá {{$v.lastname.$params.maxLength.max}} ký tự</span>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 n-username">
                <input  class="i-username form-control" type="text" placeholder="Username" v-model.trim="$v.username.$model" :class="{'is-invalid' :$v.username.$error, 'is-valid' :!$v.username.$invalid}" required>
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">
                  <span v-if="!$v.username.required">Vui lòng nhập Username.</span>
                  <span v-if="!$v.username.isUnique">Username không được chứa khoảng trắng</span>
                </div>
              </div>
              <div class="form-group col-md-6 email">
                <input class="i-email form-control" type="email" placeholder="Email Address" v-model.trim="$v.email.$model" :class="{'is-invalid' :$v.email.$error, 'is-valid' :!$v.email.$invalid}" required>
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">
                  <span v-if="!$v.email.required">Vui lòng nhập Email.</span>
                  <span v-if="!$v.email.isUnique">Email không đúng định dạng</span>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 n-password">
                <input class="i-password form-control" id="password" type="password" placeholder="Password" v-model.trim="$v.password.$model" :class="{'is-invalid' :$v.password.$error, 'is-valid' :!$v.password.$invalid}" required>
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">
                  <span v-if="!$v.password.required">Vui lòng nhập Password.</span>
                  <span v-if="!$v.password.minLength">Mật khẩu phải chứa ít nhất {{$v.password.$params.minLength.min}} ký tự</span>
                </div>
              </div>
              <div class="form-group col-md-6 re-password">
                <input class="i-repassword form-control" type="password" placeholder="Confirm Password" v-model.trim="$v.repassword.$model" :class="{'is-invalid' :$v.repassword.$error, 'is-valid' : (password != '') ? !$v.repassword.$invalid : ''}" required>
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">
                  <span v-if="!$v.repassword.required">Vui lòng nhập lại mật khẩu.</span>
                  <span v-if="!$v.repassword.sameAsPassword">Mật khẩu không đúng</span>
                </div>
              </div>
            </div>
            <!-- <div class="form-row">
              <div class="form-group form-check checkpass">
                <input type="checkbox" id="showpassword" class="" @click="toggleShowPassword" v-model="showpassword">
                <label for="showpassword" class="">Show password</label>
              </div>
            </div> -->
            <input v-model="role" class="" type="hidden">
            <div v-if="thongbao">
              <p>{{message}}</p>
            </div>
            <button class="btn-register">Register</button>
            <label class="label1">By registered, you agree to our Terms of Use and Privacy Policy.</label>
        </form>
        <div class="t1">Already have an account ?
          <button class="btn1" type="button" @click="show = !show">Log In</button>
        </div>
      </div>
      <Login :active.sync="show" @submit="event => login(event)" v-if="show"></Login>
  </div>
  </div>
</div>
</template>

<script>
import Login from '../components/Login.vue'
import axios from 'axios'
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'Register',
  data () {
    return {
      show: false,
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      repassword: '',
      role: '',
      dulieu: [],
      showPassword: false,
      isAvailable: '',
      responseMessage: '',
      resEmail: '',
      thongbao: false,
      message: ''
    }
  },
  validations: {
    firstname: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(20)
    },
    lastname: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(20)
    },
    username: {
      required,
      isUnique (value) {
        if (value === '') return true
        // eslint-disable-next-line camelcase
        var username_regex = /^[a-zA-Z0-9_a-zA-Z0-9]*$/
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(username_regex.test(value))
          }, 350 + Math.random() * 300)
        })
      }
    },
    email: {
      required,
      isUnique (value) {
        if (value === '') return true

        // eslint-disable-next-line
        var email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(email_regex.test(value))
          }, 350 + Math.random() * 300)
        })
      }
    },
    password: {
      required,
      minLength: minLength(8)
    },
    repassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    // toggleShowPassword () {
    //   var show = document.getElementById('password')
    //   if (this.showPassword === false) {
    //     this.showPassword = true
    //     show.type = 'text'
    //   } else {
    //     this.showPassword = false
    //     show.type = 'password'
    //   }
    // },
    handleSubmit () {
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        email: this.email,
        password: this.password,
        repassword: this.repassword,
        role: 'Subscriber'
      }
      axios.post('http://localhost:3000/register', data)
        .then(res => {
          if (res.status === 409) {
            this.thongbao = true
            this.message = 'Username/Email đã tồn tại'
          }
          if (res.status === 201) {
            console.log('Đăng ký thành công')
            localStorage.setItem('token', res.data.token)
          }
        }, err => {
          console.log(err.response)
          this.error = err.response.data.error
        })
    },
    login (event) {
      this.show = event
    }
  },
  mounted () {
    axios.get('http://localhost:3000/alluser')
      .then(res => {
        // this.dulieu.push(res.data.users)
      })
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
.card{
  width: 1030px;
  height: 550px;
  position: absolute;
  left: 295px;
  top: 176px;
  bottom: 206px;
  background: #FFFFFF;
  border: 1px solid #2C2C2C;
  -webkit-box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 20px;
}
.register{
  position: absolute;
  width: 291px;
  height: 27px;
  left: calc(50% - 291px/2 - 0.5px);
  top: calc(50% - 27px/2 - 225.5px);
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: 27px;
  color: #000000;
}
.firstname{
  top: 100px;
  left: 30px;
  width: 455px;
  font-size: 13px;
  position: absolute;
}
.i-firstname{
  height: 50px;
  padding-left: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  border-radius: 5px;
}
.lastname{
  top: 100px;
  right: 30px;
  width: 455px;
  font-size: 13px;
  position: absolute;
}
.i-lastname{
  height: 50px;
  font-family: Roboto;
  padding-left: 10px;
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  border-radius: 5px;
}
.n-username{
  top: 190px;
  left: 30px;
  width: 455px;
  font-size: 13px;
  position: absolute;
}
.i-username{
  height: 50px;
  padding-left: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  border-radius: 5px;
}
.email{
  top: 190px;
  right: 30px;
  width: 455px;
  font-size: 13px;
  position: absolute;
}
.i-email{
  height: 50px;
  font-family: Roboto;
  padding-left: 10px;
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  border-radius: 5px;
}
.n-password{
  top: 280px;
  left: 30px;
  width: 455px;
  font-size: 13px;
  position: absolute;
}
.i-password{
  height: 50px;
  padding-left: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  border-radius: 5px;
}
.re-password{
  top: 280px;
  right: 30px;
  width: 455px;
  font-size: 13px;
  position: absolute;
}
.i-repassword{
  height: 50px;
  font-family: Roboto;
  padding-left: 10px;
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  border-radius: 5px;
}

.btn-register{
position: absolute;
width: 975px;
height: 50px;
left: calc(50% - 975px/2);
top: calc(50% - 50px/2 + 135px);
background: #81CA00;
border: 2px solid #81CA00;
box-shadow: 0px 4px 4px rgba(194, 194, 194, 0.5);
border-radius: 5px;
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 21px;
color: #FFFFFF;
}
.label1{
position: absolute;
width: 354px;
height: 15px;
left: calc(50% - 354px/2);
top: calc(50% - 15px/2 + 179px);
font-family: Roboto;
font-style: normal;
font-weight: 200;
font-size: 13px;
line-height: 15px;
color: #000000;
}
.t1{
position: absolute;
width: 175px;
height: 15px;
left: calc(50% - 175px/2 - 22.5px);
top: calc(50% - 15px/2 + 200px);
font-family: Roboto;
font-style: normal;
font-weight: 300;
font-size: 15px;
line-height: 18px;
color: #000000;
}
.btn1{
position: absolute;
width: 45px;
height: 18px;
left: calc(50% - 42px/2 + 97px);
top: calc(50% - 18px/2 + 1px);
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 15px;
line-height: 18px;
color: #3E64DE;
border: none;
background: none;
}
.checkpass{
  position: absolute;
  top: 380px;
  left: 55px;
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
  margin-top: 10px;
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
