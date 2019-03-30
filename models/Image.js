//Upload/Post images for the user
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Image Schema
const ImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  url: {
    type: String,
    required: true
  },
  caption: {
    type: String
  },
  username: {
    type: String
  },
  avatar: {
    type: String
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("image", ImageSchema);
