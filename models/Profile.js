const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String,
    required: true,
    max: 40
  },
  bio: {
    type: String
  },
  phone:{
    type:Number
  },
  website: {
    type: String
  },
  gender:{
     type:Boolean
  },
  email:{
    type:String
  },
  following:[
    {
      user:{
        type: Schema.Types.ObjectId,
        ref:'users'
      }
    }
  
  ],
  followers:[
     {
     user:{
       type:Schema.Types.ObjectId,
       ref:'users'
     }
    }
  ],
social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);