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

//limit total 5 GB
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 }
});

router.get('/:id/videos', videoController.getVideosByUserId); 
router.post('/:id/videos', upload.single('video'), authenticateToken, videoController.uploadVideo); 
router.get('/:id/videos/:pid', videoController.getVideo); 
router.put('/:id/videos/:pid',authenticateToken , videoController.editVideo); 
router.delete('/:id/videos/:pid',authenticateToken , videoController.deleteVideo); 
router.get('/', videoController.getVideos); 
router.put('/videos/:pid' , videoController.addView); 


router.post('/:pid/comments/:id',authenticateToken , commentController.addComment); 
router.get('/:pid/comments', commentController.getComments); 
router.put('/:id/:pid/comments/:cid',authenticateToken , commentController.editComment); 
router.delete('/:id/:pid/comments/:cid',authenticateToken , commentController.deleteComment); 

module.exports = router;
