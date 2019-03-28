const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    },
    caption: {
      type: String;
      required: false
    },
})
  
  module.exports = User =mongoose.model('users', UserSchema)