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
        <li><a href="/courses">Courses</a></li>
        <li class="nav-register">
          <a href="">Register <img src="../assets/img/Polygon.png"></a>
          <ul class="dropdown">
            <li><a href="">Intructor Registration</a></li>
            <hr class="hr1">
            <li><a href="">Student Registration</a></li>
          </ul>
        </li>
        <li class="nav-pro">
          <!-- <img v-if="item.imageUrl" :src="item.imageUrl" alt="" class="nav-avatar">
          <img v-else src="../assets/img/user-avatar.png" alt="" class="nav-avatar"><strong>{{ firstname }} {{ lastname }}</strong> -->
          <a href="/myprofile"><img src="../assets/img/Anhavatardoi.png" alt="" class="nav-avatar"><strong>{{ user.firstname }} {{ user.lastname }}</strong></a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="content">
  <div class="head">
    <div class="avatar">
      <div id="preview">
        <img v-if="item.imageUrl" :src="item.imageUrl" class="n-avatar" />
      </div>
        <form action="http://localhost:3000/uploads" method="POST" enctype="multipart/form-data">
        <input type="file" name="image" accept="image/*" @change="onChange" class="i-avatar"/>
        <input type="submit" value="upload" class="u-avatar">
      </form>
    </div>
    <label class="name"> Hello <strong>{{ user.firstname }} {{ user.lastname }}</strong></label>
    <div v-if="user.role=='Subscriber'">
      <form @submit="updaterole" enctype="multipart/form-data">
      <input v-model="id" class="" type="hidden">
      <button class="re-instructor">Register Instructor</button>
    </form>
    </div>
    <div v-else>
      <form @submit="updaterole" enctype="multipart/form-data">
      <input v-model="id" class="" type="hidden">
      <button class="re-instructor">Create Courses</button>
    </form>
    </div>
  </div>
  <div class="content-left">
    <nav class="nav-menu">
      <button class="nav1"><img src="../assets/img/user-icon.png" class="img1" alt="">My Profile</button>
      <button class="nav2"><img src="../assets/img/dashboard.png" class="img2" alt="">Dashboard</button>
      <button class="nav3"><img src="../assets/img/carbon_course.png" class="img3" alt="">Enrolled Courses</button>
      <button class="nav4"><img src="../assets/img/purchase-tag.png" class="img4" alt="">Purchase History</button>
      <hr class="nav-hr1"> <hr class="nav-hr2">
      <button class="nav5"><img src="../assets/img/setting.png" class="img5" alt="">Setting</button>
      <button class="nav6" @click="logout"><img src="../assets/img/logout.png" class="img6" alt="">Logout</button>
    </nav>
  </div>
  <div class="content-right">
          <div class="form-profile">
            <form @submit="update" enctype="multipart/form-data">
                <p class="p1">Username</p>
                <p class="username1">{{user.username}}</p>
                <p class="p2">Email</p>
                <p class="email">{{user.email}}</p>
                <p class="p3">Firstname</p>
                <input v-model="user.firstname" class="firstname" type="text">
                <p class="p4">Lastname</p>
                <input v-model="user.lastname" class="lastname" type="text">
                <p class="p5">Phone Number</p>
                <input v-model="user.phone" class="phone" type="text">
                <p class="p6">Role</p>
                <p class="role">{{user.role}}</p>
                <p class="p7">Registion Date</p>
                <p class="re-date">{{registiondate}}</p>
                <!-- <input type="file" name="image" accept="image/*" @change="onChange" class="ip-avatar"> -->
                <!-- <input type="file" style="display: none" name="image" accept="image/*" @change="onChange" class="i-avatar" ref="fileInput"/> -->
                <!-- <button @click="$refs.fileInput.click()">Ảnh đại diện</button> -->
                <!-- <p class="p5">Password</p>
                <input v-model="password" class="password" id="password" type="password">
                <div class="checkshowpass">
                    <input type="checkbox" id="showpassword" @click="toggleShowPassword">&ensp;Show password
                </div> -->
                <input v-model="id" class="" type="hidden">
                <button class="btn-save" >Save</button>
            </form>
      </div>
  </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
import moment from 'moment'
export default {
  name: 'Home',
  created () {
    // user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {
    // this.registiondate = moment(this.$store.state.user.registiondate).format('DD-MM-YYYY, h:mm a')
    axios.get('http://localhost:3000/user', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(res => {
        this.id = localStorage.getItem('token')
        this.user.firstname = res.data.user.firstname
        this.user.lastname = res.data.user.lastname
        this.user.username = res.data.user.username
        this.user.email = res.data.user.email
        this.user.phone = res.data.user.phone
        this.user.role = res.data.user.role
        this.date = res.data.user.registiondate
        this.registiondate = moment(this.date).format('DD-MM-YYYY, h:mm a')
      })
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
    },
    ...mapActions(['updateUser', 'updateRole', 'checkToken']),
    update () {
    //   var files = e.target.files
    //   let filename = files[0].name
    //   this.item.image = files[0].name

    //   if (!files[0]) {
    //   }
    //   var data = new FormData()
    //   data.append('image', files[0])
    //   var reader = new FileReader()
    //   reader.onload = (e) => {
    //     this.image = e.target.result
    //   }
      // let user = {
      //   id: localStorage.getItem('token'),
      //   firstname: this.user.firstname,
      //   lastname: this.user.lastname,
      //   phone: this.user.phone
      // }
      // axios.put('http://localhost:3000/update', {image: this.image, user})
      // axios.put('http://localhost:3000/update', user)
      //   .then(res => {
      //     if (res.status === 200) {
      //       this.$router.push('/myprofile')
      //     }
      //   }, err => {
      //     console.log(err.res)
      //   })
      this.updateUser({
        id: localStorage.getItem('token'),
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        phone: this.user.phone
      })
      this.$emit('submit', false)
      this.$router.push('/myprofile')
    },
    updaterole () {
      // let user = {
      //   id: localStorage.getItem('token'),
      //   role: 'Instructor'
      // }
      // axios.put('http://localhost:3000/updaterole', user)
      //   .then(res => {
      //     if (res.status === 200) {
      //       this.$router.push('/courses')
      //     }
      //   }, err => {
      //     console.log(err.res)
      //   })
      this.updateRole({
        id: localStorage.getItem('token'),
        role: 'Instructor'
      })
      this.$emit('submit', false)
      this.$router.push('/courses')
    },
    selectFile () {
      this.file = this.$refs.file.files[0]
    },
    onChange (e) {
      const file = e.target.files[0]
      this.image = file
      this.item.imageUrl = URL.createObjectURL(file)
    }
    // uploadImage (e) {
    //   let user = {
    //     id: localStorage.getItem('token')
    //   }
    //   var files = e.target.files
    //   let filename = files[0].name
    //   this.item.image = files[0].name

    //   if (!files[0]) {
    //   }
    //   var data = new FormData()
    //   data.append('image', files[0])
    //   var reader = new FileReader()
    //   reader.onload = (e) => {
    //     this.image = e.target.result
    //   }
    //   this.axios.post('http://localhost:3000/uploads', {image: this.image, user}, {
    //     headers: { 'Content-Type': 'multipart/form-data' } })
    //     .then(response => {
    //     // reader.readAsDataURL(files[0])
    //       console.log(response)
    //     }).catch(function (error) {
    //       console.log(error)
    //     })
    //   // reader.readAsDataURL(files[0])
    // }
  },
  data () {
    return {
      firstname: '',
      email: '',
      username: '',
      lastname: '',
      phone: '',
      role: '',
      registiondate: '',
      id: '',
      item: {
        // ...
        image: null,
        imageUrl: null
      }
      // show: false
    }
  },
  components: {
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
  top: 70px;
  text-align: center;
  color: black;
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: cover;
}
 /* head*/
.head{
  height: 230px;
  border-bottom: 1px solid #C2C2C2;
}
.avatar{
  position: absolute;
  width: 175px;
  height: 170px;
  left: calc(50% - 175px/2 - 569.5px);
  top: calc(50% - 170px/2 - 350px);
  background: url('../assets/img/Anhavatardoi.png');
  border-radius: 85px;
}

.name{
    position: absolute;
    width: 300px;
    height: 33px;
    left: calc(50% - 63px/2 - 419.5px);
    top: calc(50% - 33px/2 - 337px);
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 28px;
    line-height: 33px;
    color: #000000;
}
.name>strong{
  font-weight: bold;
}

.re-instructor{
  position: absolute;
  width: 350px;
  height: 50px;
  left: calc(50% - 350px/2 + 525px);
  top: calc(50% - 50px/2 - 345px);
  background: #FFFFFF;
  border: 1px solid #3E64DE;
  box-shadow: 0px 4px 4px rgba(194, 194, 194, 0.5);
  border-radius: 5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #3E64DE;
}

.re-instructor:hover{
  background: #3E64DE;
  border: 1px solid #3E64DE;
  box-shadow: 0px 4px 4px rgba(194, 194, 194, 0.5);
  border-radius: 5px;
  color: #FFFFFF;
}
.n-avatar{
  width: 180px;
  border-radius: 50%;
  height: 180px;
  left: 0px;
  position: absolute;
  top: -7px;
}
.i-avatar{
  top: 175px;
  position: absolute;
  left: 25px;
}
.ip-avatar{
  margin-left: 425px;
  position: absolute;
}
.u-avatar{
  margin-top: 176px;
  margin-left: -175px;
}
/* content left */
.content-left{
    float: left;
    width: 360px;
    height: 400px;
}

.nav1{
    position: absolute;
    width: 359px;
    height: 70px;
    left: calc(50% - 300px/2 - 610px);
    top: calc(50% - 70px/2 - 199px);
    background: #3068A8;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: #FFFFFF;
}

.nav2{
  position: absolute;
  width: 359px;
  height: 70px;
  left: calc(50% - 300px/2 - 610px);
  top: calc(50% - 70px/2 - 129px);
  border: none;
  background: #F8F8F8;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  color: #000000;
}

.nav3{
  position: absolute;
  width: 359px;
  height: 70px;
  left: calc(50% - 300px/2 - 610px);
  top: calc(50% - 70px/2 - 59px);
  border: none;
  background: #F8F8F8;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  color: #000000;
}

.nav4{
  position: absolute;
  width: 359px;
  height: 70px;
  left: calc(50% - 300px/2 - 610px);
  top: calc(50% - 70px/2 + 11px);
  border: none;
  background: #F8F8F8;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  color: #000000;
}

.nav5{
  position: absolute;
  width: 359px;
  height: 70px;
  left: calc(50% - 300px/2 - 610px);
  top: calc(50% - 70px/2 + 83px);
  border: none;
  background: #F8F8F8;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  color: #000000;
}

.nav6{
  position: absolute;
  width: 359px;
  height: 70px;
  left: calc(50% - 300px/2 - 610px);
  top: calc(50% - 70px/2 + 153px);
  border: none;
  background: #F8F8F8;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  color: #000000;
}

.nav-hr1{
  position: absolute;
  width: 330px;
  height: 0px;
  left: calc(50% - 300px/2 - 584px);
  top: calc(50% - 0px/2 + 46px);
  border: 1px solid #C2C2C2;
}

.nav-hr2{
  position: absolute;
  left: 0.2%;
  right: 27.43%;
  bottom: 36.6%;
  background: #C4C4C4;
  border: 1px solid #C4C4C4;
  transform: rotate(90deg);
  width: 711px;
}

.img1{
  margin-left: -80px;
  margin-right: 10px;
}
.img2{
  margin-left: -80px;
  margin-right: 10px;
}
.img3{
  margin-left: -45px;
  margin-right: 10px;
}
.img4{
  margin-left: -47px;
  margin-right: 10px;
}
.img5{
  margin-left: -102px;
  margin-right: 10px;
}
.img6{
  margin-left: -97px;
  margin-right: 10px;
}

/* content right */
.content-right{
  position: absolute;
  width: 1100px;
  height: 704px;
  left: calc(50% - 1100px/2 + 155px);
  top: calc(50% - 704px/2 + 130px);
}

.p1{
  position: absolute;
  width: 75px;
  height: 18px;
  left: 15px;
  margin-top: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.p2{
  position: absolute;
  width: 50px;
  height: 18px;
  left: 15px;
  margin-top: 70px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.p3{
  position: absolute;
  width: 80px;
  height: 18px;
  left: 15px;
  margin-top: 120px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.p4{
  position: absolute;
  width: 80px;
  height: 18px;
  left: 15px;
  margin-top: 170px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.p5{
  position: absolute;
  width: 110px;
  height: 18px;
  left: 15px;
  margin-top: 220px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.p6{
  position: absolute;
  width: 45px;
  height: 18px;
  left: 15px;
  margin-top: 270px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.p7{
  position: absolute;
  width: 110px;
  height: 18px;
  left: 15px;
  margin-top: 320px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.username1{
  position: absolute;
  height: 18px;
  margin-left: 155px;
  top: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.email{
  position: absolute;
  width: 102px;
  height: 18px;
  left: 155px;
  top: 70px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.firstname{
  position: absolute;
  width: 250px;
  height: 35px;
  left: 155px;
  top: 110px;
  background: #F8F8F8;
  border: 1px solid #C2C2C2;
  box-sizing: border-box;
  border-radius: 5px;
  padding-left: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.lastname{
  position: absolute;
  width: 250px;
  height: 35px;
  left: 155px;
  top: 160px;
  background: #F8F8F8;
  border: 1px solid #C2C2C2;
  box-sizing: border-box;
  border-radius: 5px;
  padding-left: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.phone{
  position: absolute;
  width: 250px;
  height: 35px;
  left: 155px;
  top: 210px;
  background: #F8F8F8;
  border: 1px solid #C2C2C2;
  box-sizing: border-box;
  border-radius: 5px;
  padding-left: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.role{
  position: absolute;
  height: 18px;
  margin-left: 155px;
  top: 270px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.re-date{
  position: absolute;
  height: 18px;
  margin-left: 155px;
  top: 320px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.btn-save{
  position: absolute;
  width: 100px;
  height: 30px;
  left: calc(50% - 100px/2 - 195px);
  top: calc(50% - 30px/2 + 25px);
  background: #81CA00;
  border: 2px solid #81CA00;
  box-shadow: 0px 4px 4px rgb(194 194 194 / 50%);
  border-radius: 5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #FFFFFF;
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
