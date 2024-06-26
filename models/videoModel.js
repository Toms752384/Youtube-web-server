const mongoose = require('mongoose');

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

// the logic itself of the function - create one
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

// the logic itself of the function - get all
videoSchema.statics.getAllVideos = async function () {
  try {
    return await this.find();
  } catch (err) {
    throw new Error('Error fetching videos: ' + err.message);
  }
};

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
