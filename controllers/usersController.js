
const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');

//fetch users function
const fetchUsers = async (req, res) => {
  try {
    const users = await User.fetchAllUsers();
    res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//add a new user function
const addNewUser = async (req, res) => {
  if (req.file) {
    //assuming you want to convert the image to a base64 string
    const imgBase64 = req.file.buffer.toString('base64');
    //append image in base64 to req.body
    req.body.avatar = imgBase64;
  }

  try {
    const newUser = await User.createUser(req.body);
    res.status(201).json({ message: 'User added successfully', newUser: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const createToken = async (req, res) => {
  try {
    //jwt.sign - give to the token a token
    const token = jwt.sign({ userId: req.body.userId }, 'our_secret_maayan_tom_alon_2002!<3', { expiresIn: '30d' });
    res.status(200).json({ message: "token created successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//login to an existing user function
const getUser = async (req, res) => {
  try {
    const loggedUser = await User.fetchUser(req.params.id);
    //send response
    res.status(201).json({ message: 'User logged successfully', loggedInUser: loggedUser });
  }
  catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//delete a user from the database function
const deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);

    //send response
    res.status(201).json({ message: 'User deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

//function to edit a user
const editUser = async (req, res) => {
  try {
    console.log(`Attempting to edit user with ID: ${req.params.id}`);
    //create an object to send to the model function
    const updateData = {
      nickname: req.body.nickname,
    };
    //handle base64 avatar
    if (req.body.avatar) {
      console.log("Avatar base64 received");
      const base64Data = req.body.avatar.replace(/^data:image\/\w+;base64,/, "");
      updateData.avatar = `data:image/png;base64,${base64Data}`;
    } else {
      console.log("No avatar base64 received.");
    }
    //handle file avatar
    if (req.file) {
      console.log("Avatar file received:", req.file);
      const imgBase64 = req.file.buffer.toString('base64');
      updateData.avatar = `data:${req.file.mimetype};base64,${imgBase64}`;
    }
    else {
      console.log("No avatar file received.");
    }

    const user = await User.editUser(req.params.id, updateData);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User edited successfully', user: user });
  } catch (error) {
    res.status(500).json({ message: 'Error editing user', error });
  }
};


module.exports = { fetchUsers, addNewUser, getUser, deleteUser, editUser,
   createToken };

