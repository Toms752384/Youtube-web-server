const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
//////////////////////////////////////////////////
const { authenticateToken } = require('../routes/tokenRoutes');
///////////////////////////////////////////////////


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
  limits: { fileSize: 5 * 1024 * 1024 * 1024 } //5MB limit
});

//correct functions
router.get('/fetchUsers', usersController.fetchUsers); //yeah
router.get('/:id', usersController.getUser); //yey
router.delete('/:id',authenticateToken , usersController.deleteUser); //oved
router.post('/', upload.single('avatar'), usersController.addNewUser); //oved
router.put('/:id', upload.single('avatar'), authenticateToken , usersController.editUser) //oved


module.exports = router;
