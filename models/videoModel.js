const mongoose = require('mongoose');

// system of files in node.js for delete 
const fs = require('fs');
const path = require('path');

// the schema for a collection video
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  // // to coneect which user uploueded it
  // uploadedBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  // timeOfUpload: {
  //   type: Date,
  //   default: Date.now
  // },
  // subscribers: {
  //   type: Number,
  //   default: 0
  // },
  // likes: {
  //   type: Number,
  //   default: 0
  // },
  description: {
    type: String,
    required: true
  },
  // avatar: {
  //   type: String,
  //   required: true
  // },
  videoLink: {
    type: String,
    required: true
  },
  comments: {
    type: [String],
    default: []
  }
});


videoSchema.statics.uploadVideo = async function (file, body) {
  try {
    const videoUrl = `/localVideos/${file.filename}`;
    const video = new this({
      title: body.title,
      description: body.description,
      videoLink: videoUrl,
      comments: body.comments || []
    });
    await video.save();
    return video;
  } catch (err) {
    throw new Error('Error saving video: ' + err.message);
  }
};

videoSchema.statics.getAllVideos = async function () {
  try {
    return await this.find();
  } catch (err) {
    throw new Error('Error fetching videos: ' + err.message);
  }
};

videoSchema.statics.deleteVideo = async function (videoId) {
  try {
    const video = await this.findByIdAndDelete(videoId);
    if (video) {
      const videoFilePath = path.join(__dirname, '../', video.videoLink);
      fs.unlinkSync(videoFilePath); // מחיקת הקובץ מהשרת
    }
    return video;
  } catch (err) {
    throw new Error('Error deleting video: ' + err.message);
  }
};

videoSchema.statics.editVideo = async function (videoId, updateData) {
  try {
    const video = await this.findByIdAndUpdate(videoId, updateData, { new: true });
    return video;
  } catch (err) {
    throw new Error('Error editing video: ' + err.message);
  }
};

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
