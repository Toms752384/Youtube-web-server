// tokenRoutes.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


/////////////////
const jwt = require('jsonwebtoken');
//////////////////////////////////

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, 'our_secret_maayan_tom_alon_2002!<3', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };



// add a token to a exist user that try to login
router.post('/', usersController.createToken); // Use the root of this router for token generation

module.exports = router;
module.exports.authenticateToken = authenticateToken;
