const Comment = require('../models/commentModel');
const Video = require('../models/videoModel');
const User = require('../models/usersModel');

exports.addComment = async (req, res) => {
  try {
    console.log(`Attempting to add comment to video with ID: ${req.params.pid}`); //
    //get the video ID and user ID from the request parameters
    const videoId = req.params.pid;
    const userId = req.params.id;

    //get the comment content from the request body
    const { content } = req.body;
    console.log(`Fetching user with ID: ${userId}`); //
    //fetch the user's avatar from the database
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const avatar = user.avatar;
    //assuming the username is stored in the user document
    const username = user.username;
    
    //add the comment
    const comment = await Comment.addComment(videoId, content, avatar, username, userId);

    res.status(200).json({ message: 'Comment added successfully', comment: comment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding Comment', error });
  }
};

//to pull out all the comments to the id video specific
exports.getComments = async (req, res) => {
  try {
    //get the id from the path
    const  videoId  = req.params.pid;

    //get
    const comments = await Comment.getCommentsByVideoId(videoId);
    res.status(200).json({ message: 'Comments fetched successfully', comments: comments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Comments', error });
  }
};

//edit a comment
exports.editComment = async (req, res) => {
  try {
    const commentId = req.params.cid;
    const videoId = req.params.pid;
    const userId = req.params.id;

    const {content} = req.body;
    
    const updatedComment = await Comment.editCommentById(commentId, content);
    res.status(200).json({ message: 'Comment edited successfully', updatedComment: updatedComment });
  } catch (error) {
    res.status(500).json({ message: 'Error editing Comment', error });
  }
};

//delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.cid;
    const videoId = req.params.pid;
    const userId = req.params.id;
    
    const deletedComment = await Comment.deleteCommentById(commentId);
    if (!deletedComment) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }

    //update the video that one comment is deleted it will take it dowm
    await Video.findByIdAndUpdate(deletedComment.video, { $pull: { comments: commentId } });

    res.status(200).json({ message: 'Comment deleted successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Error delete Comment', error });
  }
};