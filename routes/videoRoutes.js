const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const multer = require('multer');
const path = require('path');

// the stack of all the videos - des to save in localVideos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'localVideos/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('video'), videoController.uploadVideo);
router.get('/', videoController.getVideos);

module.exports = router;
