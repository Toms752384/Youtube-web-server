// tokenRoutes.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');



// add a token to a exist user that try to login
router.post('/', usersController.createToken); // Use the root of this router for token generation

module.exports = router;
