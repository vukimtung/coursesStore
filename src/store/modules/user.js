import axios from 'axios'

const state = {
  user: {}
}

const getters = {
  user: state => state.user
}

const mutations = {
  LOGIN_USER (state, infoUser) {
    state.user = infoUser
  },
  UPDATE_USER (state, infoUser) {
    state.user = infoUser
  },
  UPDATE_ROLE (state, infoUser) {
    state.user = infoUser
  },
  GET_USER (state, infoUser) {
    state.user = infoUser
  }
}

const actions = {
  async loginUser ({commit}, data) {
    // console.log(data)
    const response = await axios.post('http://localhost:3000/login', data)
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token)
      commit('LOGIN_USER', response.data.user)
    }
  },
  async updateUser ({commit}, data) {
    const response = axios.put('http://localhost:3000/update', data)
    if (response.status === 200) {
      commit('UPDATE_USER', response.data.user)
    }
  },
  async updateRole ({commit}, data) {
    const response = await axios.put('http://localhost:3000/updaterole', data)
    if (response.status === 200) {
      commit('UPDATE_ROLE', response.data.user)
    }
  },
  async checkToken ({commit}) {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/')
    } else {
      const response = axios.get('http://localhost:3000/user', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      if (response.status === 200) {
        commit('GET_USER', response.data.user)
      }
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

// const state = {
//   user: {
//     username: 'Vu Kim Tung',
//     email: 'kimtung204@gmail.com'
//   }
// }

// const getters = {
//   getUsername: state => {
//     return 'Username: ' + state.user.username
//   },
//   getEmail: state => {
//     return 'Email: ' + state.user.email
//   }
// }

// const mutations = {
//   changeUsername (state, newUsername) {
//     state.user.username = newUsername
//   },
//   changeEmail (state, newEmail) {
//     state.user.email = newEmail
//   }
// }

// const actions = {
//   handleChangeUsername (value, newUsername) {
//     value.commit('changeUsername', newUsername)
//   },
//   handleChangeEmail (value, newEmail) {
//     value.commit('changeEmail', newEmail)
//   }
// }
