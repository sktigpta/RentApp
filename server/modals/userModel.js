// userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isBusiness: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isMember: { type: Boolean, default: false },
  location: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
