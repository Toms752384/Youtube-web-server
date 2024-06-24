const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/addUser', usersController.addUser);

module.exports = router;
