const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//function to fetch all the users
router.get('/fetchUsers', usersController.fetchUsers);

//function to add a new user to the list
router.post('/addUser', usersController.addNewUser);

module.exports = router;
