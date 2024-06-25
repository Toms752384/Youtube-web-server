
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

//add user to list from models
const addNewUser = async (req, res) => {
  try {
    const newUser = await User.createUser(req.body);
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { fetchUsers, addNewUser };

