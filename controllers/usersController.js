
const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');

//fetch users
const fetchUsers = async (req, res) => {
  try {
    const users = await User.fetchAllUsers();    
    res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }


};

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

module.exports = { fetchUsers, addNewUser };

