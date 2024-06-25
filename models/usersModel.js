const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String
  }
})

// Static method to fetch all users
userSchema.statics.fetchAllUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

// Static method to create a new user
userSchema.statics.createUser = async function (userData) {
  try {
    const newUser = new this(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
