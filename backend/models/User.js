// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    enum: ['customer', 'helper'], // Restrict to these two roles
    default: 'customer',
  },
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

const User = mongoose.model('User', userSchema);
module.exports = User;