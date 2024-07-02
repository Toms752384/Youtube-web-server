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

//static function to fetch all users
userSchema.statics.fetchAllUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

//static function to create a new user
userSchema.statics.createUser = async function (userData) {
  try {
    const newUser = new this(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

//static function to fetch a user using its username
userSchema.statics.fetchUser = async function(userId) {
  try {
    const user = await this.findById(userId);
    return user;
  }
  catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};

//static function to delete a user from the list
userSchema.statics.deleteUser = async function(username) {
  try{
      await this.deleteOne({username: username});
  }
  catch(error){
    throw new Error('Error deleting user: ' + error.message);
  }
}

const User = mongoose.model('User', userSchema);
module.exports = User;
