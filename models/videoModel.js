// Model of videos 
// Manages the logic for adding, removing, and updating videos.

// We want it to connect the dataBase - mongoose
const mongoose = require('mongoose');

// The data to each video - A collection
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
  }
})

// Static method to handle video upload
videoSchema.statics.uploadVideo = async function (file, body) {
  try {
    const videoUrl = `/uploads/${file.filename}`;
    const video = new this({
      title: body.title,
      description: body.description,
      videoLink: videoUrl
    });
    await video.save();
    return video;
  } catch (err) {
    throw new Error('Error saving video: ' + err.message);
  }
};

// Static method to fetch all videos
videoSchema.statics.getAllVideos = async function () {
  try {
    return await this.find();
  } catch (err) {
    throw new Error('Error fetching videos: ' + err.message);
  }
};

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;