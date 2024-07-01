const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const commentController = require('../controllers/commentController');
const multer = require('multer');
const path = require('path');

//the stack of all the videos - des to save in local
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'localVideos/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

//limit tot 5 gb
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 }
});

//paths for videos
router.post('/upload', upload.single('video'), videoController.uploadVideo);
router.get('/fetchVideos', videoController.getVideos); 
router.get('/fetchVideo/:id', videoController.getVideo);
router.delete('/:id', videoController.deleteVideo); //change route to be deleteVideo/:id
router.put('/:id', videoController.editVideo); //change route to be editVideo/:id

//paths for comments in videos
router.post('/:videoId/addComment', commentController.addComment);
router.get('/:videoId/comments', commentController.getComments);
router.put('/comments/:commentId', commentController.editComment); 
router.delete('/comments/:commentId', commentController.deleteComment);

module.exports = router;
