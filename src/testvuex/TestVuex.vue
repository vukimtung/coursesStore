<template>
  <div class="container">
      <h1>Test Vue</h1>
      <h2>Username: {{username}}</h2>
      <div>
          <input v-model="usernameInput">
          <button @click="changeUsername">Click</button>
      </div><br>
      <h2>Email: {{email}}</h2>
      <div>
          <input v-model="emailInput">
          <button @click="changeEmail">Click</button>
      </div><br>
      <div>{{getUsername}}</div>
      <div>{{getEmail}}</div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'TestVuex',
  data () {
    return {
      usernameInput: '',
      emailInput: ''
    }
  }
  // computed: {
  //   username () {
  //     return this.$store.state.username
  //   },
  //   email () {
  //     return this.$store.state.email
  //   },
  //   ...mapGetters(['getUsername', 'getEmail'])
  // },
  // methods: {
  //   changeUsername () {
  //     this.$store.dispatch('handleChangeUsername', this.usernameInput)
  //   },
  //   changeEmail () {
  //     this.$store.dispatch('handleChangeEmail', this.emailInput)
  //   }
  // }
}
</script>

<style>

</style>
