
const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');

//fetch users
const fetchUsers = async (req, res) => {
  try {
    const users = await User.fetchAllUsers();
    res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }


};

//add a new user
const addNewUser = async (req, res) => {
  if (req.file) {
    // Assuming you want to convert the image to a base64 string
    const imgBase64 = req.file.buffer.toString('base64');
    req.body.avatar = imgBase64; // append image in base64 to req.body
  }

  try {
    const newUser = await User.createUser(req.body);
    res.status(201).json({ message: 'User added successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//key to create a JWT
const JWT_SECRET = 'secret_key';

//login to an existing user
const login = async (req, res) => {
  try {
    const loggedUser = await User.fetchUser(req.body.username);

    //generate JWT for the user
    const token = jwt.sign({ username: req.body.username }, JWT_SECRET, { expiresIn: '1h' });

    //set cookie
    res.cookie('token', token, { httpOnly: true });

    //send response
    res.status(201).json({ message: 'User logged successfully', loggedUser, token: token });
  }
  catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//delete a user from the database
const deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.body.username);

    //send response
    res.status(201).json({ message: 'User deleted successfully' });
  }
  catch(error){
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = { fetchUsers, addNewUser, login, deleteUser };

