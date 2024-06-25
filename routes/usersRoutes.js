const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// for profile
const multer = require('multer');
const storage = multer.memoryStorage(); // stores files in memory
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false); // reject file
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

//function to fetch all the users
router.get('/fetchUsers', usersController.fetchUsers);

//function to add a new user to the list
router.post('/addUser', upload.single('avatar'), usersController.addNewUser);

module.exports = router;
