const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: {
    unique: true,
    type: String
  },
  password: String,
  phone: String,
  role: String,
  registiondate: {
    type: Date,
    default: Date.now()
  },
  image: String
  // img:
  //   {
  //     data: Buffer,
  //     contentType: String
  //   }
})

const User = mongoose.model('User', userSchema)
module.exports = User
