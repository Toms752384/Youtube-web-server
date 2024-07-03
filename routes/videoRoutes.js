const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const commentController = require('../controllers/commentController');
const { authenticateToken } = require('../routes/tokenRoutes');
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

//correct paths for videos
router.get('/:id/videos', videoController.getVideosByUserId); //oved noder
router.post('/:id/videos', upload.single('video'), authenticateToken, videoController.uploadVideo); //noder neder
router.get('/:id/videos/:pid', videoController.getVideo); //metoraf
router.put('/:id/videos/:pid',authenticateToken , videoController.editVideo); //yey
router.delete('/:id/videos/:pid',authenticateToken , videoController.deleteVideo); //nice
router.get('/', videoController.getVideos); //oved


// # add coment #
router.post('/:pid/comments/:id',authenticateToken , commentController.addComment); //oved
// # get all comments by id of a video #
router.get('/:pid/comments', commentController.getComments); //oved noder
// # edit a comment #
router.put('/:id/:pid/comments/:cid',authenticateToken , commentController.editComment); 
// # delete a comment #
router.delete('/:id/:pid/comments/:cid',authenticateToken , commentController.deleteComment); //oved


module.exports = router;
