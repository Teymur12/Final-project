const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    image:{
        type: String,
        required: true,
        default: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
    },
    ranking:{
        type: Number,
        default: 0
    },
    points:{
        type: Number,
        default: 0
    }
  }, {
    timestamps: true,
  });

module.exports = mongoose.model('User', userSchema);