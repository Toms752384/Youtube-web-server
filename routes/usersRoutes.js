const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// for avatar of user
const multer = require('multer');
const storage = multer.memoryStorage(); // stores files in memory
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false); // reject file
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 } // מגביל ל-5GB
});

//correct functions
router.get('/fetchUsers', usersController.fetchUsers); //yeah
router.get('/:id', usersController.getUser); //yey
router.delete('/:id', usersController.deleteUser); //livdok
router.post('/', upload.single('avatar'), usersController.addNewUser);

//function to add a new user to the list
router.post('/addUser', upload.single('avatar'), usersController.addNewUser);

//function to log to a user from the list
// router.post('/login', usersController.login);

//function to delete a user from the list
router.post('/deleteUser', usersController.deleteUser);

module.exports = router;
