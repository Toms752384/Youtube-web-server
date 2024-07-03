const Comment = require('../models/commentModel');
const Video = require('../models/videoModel');

// add a comment 
exports.addComment = async (req, res) => {
  try {
    // get the id from the path / id = #### /
    const { videoId } = req.params;
    // get the comment it self
    const { content } = req.body;
    ////////////////////////////////////////////////////
    if (req.file) {
      // Assuming you want to convert the image to a base64 string
      const imgBase64 = req.file.buffer.toString('base64');
      req.body.avatar = imgBase64; // append image in base64 to req.body
    }
    const { avatar } = req.body;
    const { userId } = req.body;
    const { username } = req.body;
    //////////////////////////////////////////////////////////////

    // add it
    const comment = await Comment.addComment(videoId, content, avatar , username, userId);

    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// to pull out all the comments to the id video specific
exports.getComments = async (req, res) => {
  try {
    // get the id from the path
    const { videoId } = req.params.pid;

    // GET
    const comments = await Comment.getCommentsByVideoId(videoId);

    res.status(200).json({ message: 'Comments fetched successfully', comments: comments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Comments', error });
  }
};

// edit a comment
exports.editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    
    const updatedComment = await Comment.editCommentById(commentId, content);
    res.status(200).json({ success: true, comment: updatedComment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    
    const deletedComment = await Comment.deleteCommentById(commentId);
    if (!deletedComment) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }

    // update the video that one comment is deleted it will take it dowm
    await Video.findByIdAndUpdate(deletedComment.video, { $pull: { comments: commentId } });

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};