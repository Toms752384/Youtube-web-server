const mongoose = require('mongoose');

// system of files in node.js for delete 
const fs = require('fs');
const path = require('path');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true
  },
  description: {
    type: String
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
