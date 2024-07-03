
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
    // Assuming you want to convert the image to a base64 string
    const imgBase64 = req.file.buffer.toString('base64');
    req.body.avatar = imgBase64; // append image in base64 to req.body
  }

  try {
    const newUser = await User.createUser(req.body);
    res.status(201).json({ message: 'User added successfully', newUser: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// //key to create a JWT
// const JWT_SECRET = 'secret_key';

//login to an existing user function
const getUser = async (req, res) => {
  try {
    const loggedUser = await User.fetchUser(req.params.id);

    //generate JWT for the user
    // const token = jwt.sign({ username: req.body.username }, JWT_SECRET, { expiresIn: '1h' });

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

// const editUser = async (req, res) => {
//   try {
//     console.log(`Attempting to edit user with ID: ${req.params.id}`);
//     const user = await User.editUser(req.params.id, req.body);
//     if (!user) {
//       return res.status(404).json({ message: 'user not found' });
//     }
//     return res.status(200).json({ message: 'User edited successfully', user: user });
//   } catch (error) {
//     res.status(500).json({ message: 'Error editing video', error });
//   }
// };

//function to edit a user
const editUser = async (req, res) => {
  try {
      console.log(`Attempting to edit user with ID: ${req.params.id}`);
      //create an object to send to the mdel function
      const updateData = {
          nickname: req.body.nickname,
      };
      //if a photo was added, add to the object
      if (req.file) {
          const imgBase64 = req.file.buffer.toString('base64');
          updateData.avatar = `data:${req.file.mimetype};base64,${imgBase64}`;
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

module.exports = { fetchUsers, addNewUser, getUser, deleteUser, editUser };

