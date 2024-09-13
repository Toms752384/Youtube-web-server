const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { authenticateToken } = require('../routes/tokenRoutes');


//for avatar of user
const multer = require('multer');

// stores files in memory
const storage = multer.memoryStorage(); 
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false); //reject file
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 } //5MB limit
});

router.get('/fetchUsers', usersController.fetchUsers); 
router.get('/:id', usersController.getUser); 
router.delete('/:id',authenticateToken , usersController.deleteUser); 
router.post('/', upload.single('avatar'), usersController.addNewUser); 
router.put('/:id', upload.single('avatar'), authenticateToken , usersController.editUser) 
router.get('/:id/videoHistory', authenticateToken, usersController.getVideoHistory);  // New route for fetching video history
router.post('/:id/addVideoToHistory', authenticateToken, usersController.addVideoToHistory);  // New route for adding video to history

module.exports = router;
