const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const commentController = require('../controllers/commentController');
const multer = require('multer');
const path = require('path');

// the stack of all the videos - des to save in local
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'localVideos/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// paths for videos
router.post('/upload', upload.single('video'), videoController.uploadVideo);
router.get('/', videoController.getVideos); //start here
router.delete('/:id', videoController.deleteVideo);
router.put('/:id', videoController.editVideo);

// paths for comments in videos
router.post('/:videoId/addComment', commentController.addComment);
router.get('/:videoId/comments', commentController.getComments);
router.put('/comments/:commentId', commentController.editComment); 
router.delete('/comments/:commentId', commentController.deleteComment);

module.exports = router;
