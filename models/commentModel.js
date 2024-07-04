const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  video: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true 
    },
  userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: true 
    },
  username : {
    type : String,
    required : true
  },
  avatar : {
    type : String
  },
  content: { 
    type: String, 
    required: true 
},
});
//a static func to add comment
commentSchema.statics.addComment = async function(videoId, content, avatar , username, userId) {
  try {
    // get all the data u need
    const comment = new this({ video: videoId,  userId : userId, username : username,  avatar : avatar, content : content });
    await comment.save();
    
    //update the correct video to *include* the comments that belong to him
    const Video = mongoose.model('Video');
    await Video.findByIdAndUpdate(videoId, { $push: { comments: comment._id } });
    
    return comment;
  } catch (error) {
    throw new Error('Error adding comment: ' + error.message);
  }
};

//a static func to pull all the comment to a video - 
//she looks for the all the comments that have the id that is the same as the id video
//turn immediately on the comments in the data 
commentSchema.statics.getCommentsByVideoId = async function(videoId) {
  try {

    const comments = await this.find({ video: videoId });
    return comments;
  } catch (error) {
    throw new Error('Error fetching comments: ' + error.message);
  }
};

//delete a comment
commentSchema.statics.deleteCommentById = async function(commentId) {
  try {
    const deletedComment = await this.findByIdAndDelete(commentId);
    return deletedComment;
  } catch (error) {
    throw new Error('Error deleting comment: ' + error.message);
  }
};

//edit a comment
commentSchema.statics.editCommentById = async function(commentId, content) {
  try {
    const updatedComment = await this.findByIdAndUpdate(commentId, { content }, { new: true });
    return updatedComment;
  } catch (error) {
    throw new Error('Error editing comment: ' + error.message);
  }
};

module.exports = mongoose.model('Comment', commentSchema);