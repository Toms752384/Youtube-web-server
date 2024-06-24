
//get users from the models
const { getUsers, addUser } = require('../models/usersModel');
const fetchUsers = (req, res) => {
  try {
    const users = getUsers();
    res.json({users});
    res.status(200).json({ message: 'Users fetched successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }


};

//add user to list from models
const addNewUser = (req, res) => {
  try {
    const { username, password, nickname, avatar } = req.body;
    addUser({ username, password, nickname, avatar });
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { fetchUsers, addNewUser };

