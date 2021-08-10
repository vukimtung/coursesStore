<template>
  <transition name="dialog">
    <div class="dialog-backdrop" v-if="active" @click="changeActive">
        <div class="formlog" @click.stop>
          <div class="form-login">
            <form @submit.prevent="login">
              <label class="login">Login</label>
                <input v-model="email" class="username" type="text" placeholder="Username or email address">
                <input v-model="password" class="password" type="password" placeholder="Password">
                <div class="remember"><input type="checkbox" name="" value="Remember Me">&ensp;Remember Me</div>
                <a href="" class="forgotpass">Forgot Password</a>
                <button class="btn-login" >Login</button>
                <router-link to="/register"><button class="btn-newaccount">
                  Create new account
                </button></router-link>
            </form>
          </div>
        </div>
        <slot/>
      </div>
  </transition>
</template>

<script>
// import axios from 'axios'
import {mapActions} from 'vuex'
export default {
  name: 'Login',
  props: {
    active: { type: Boolean, default: false }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    // Hàm thay đổi active để đóng dialog
    changeActive () {
      this.$emit('update:active', false)
    },
    ...mapActions(['loginUser']),
    login () {
      this.loginUser({
        email: this.email,
        password: this.password
      })
      this.$emit('submit', false)
      this.$router.push('/myprofile')
      // let user = {
      //   email: this.email,
      //   password: this.password
      // }
      // axios.post('http://localhost:3000/login', user)
      //   .then(res => {
      //     if (res.status === 200) {
      //       localStorage.setItem('token', res.data.token)
      //       this.$router.push('/myprofile')
      //     }
      //   }, err => {
      //     console.log(err.response)
      //     this.error = err.response.data.error
      //   })
    }
  }
}
</script>

<style>
.dialog-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog-container {
  max-width: 768px;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  background-color: #fff;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s;
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active .dialog-container,
.dialog-leave-active .dialog-container {
  transition: transform 0.4s;
}
.dialog-enter .dialog-container,
.dialog-leave-to .dialog-container {
  transform: scale(0.9);
}
.formlog{
  position: relative;
  width: 500px;
  height: 500px;
  left: 510px;
  top: 100px;
}
.form-login{
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  background: #FFFFFF;
  border: 2px solid #C2C2C2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}
.login{
  position: absolute;
  width: 76px;
  height: 42px;
  left: 210px;
  top: 37px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  color: #000000;
}
.username{
  position: absolute;
  height: 50px;
  width: 350px;
  border-radius: 0px;
  left: 75px;
  right: 75px;
  top: 124px;
  bottom: 326px;
  background: #ECEEF4;
  border: 2px solid #C2C2C2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Roboto;
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 21px;
  padding-left: 10px;
  border-radius: 5px;
}
.password{
  position: absolute;
  height: 50px;
  width: 350px;
  border-radius: 0px;
  left: 75px;
  right: 75px;
  top: 197px;
  bottom: 253px;
  background: #ECEEF4;
  border: 2px solid #C2C2C2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Roboto;
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 21px;
  padding-left: 10px;
  border-radius: 5px;
}
.remember{
  position: absolute;
  height: 15px;
  left: 95px;
  top: 255px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 200;
  font-size: 13px;
  line-height: 15px;
  color: #000000;
}
.forgotpass{
  position: absolute;
  width: 97px;
  height: 15px;
  left: 328px;
  top: 260px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 200;
  font-size: 13px;
  line-height: 15px;
  color: #000000;
  cursor: pointer;
  text-decoration: none;
}
.btn-login{
  position: absolute;
  width: 350px;
  height: 50px;
  left: 75px;
  right: 75px;
  bottom: 156px;
  background: #3E64DE;
  border: 2px solid #3E64DE;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 15px;
  color: #ffffff;
  border-radius: 5px;
}
.btn-newaccount{
  position: absolute;
  width: 350px;
  height: 50px;
  left: 73px;
  top: 357px;
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 15px;
  color: #000000;
  border-radius: 5px;
}
</style>
