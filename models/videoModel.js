const mongoose = require('mongoose');

// system of files in node.js for delete 
const fs = require('fs');
const path = require('path');
const { type } = require('os');

// the schema for a collection video
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: { 
    type: String,
    required: true
  },
  views: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  subscribers: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  comments: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment'
  }]
});


videoSchema.statics.uploadVideo = async function (file, body) {
  try {
    const videoLink = `/localVideos/${file.filename}`;
    const video = new this({
      title: body.title,
      artist: body.artist || "title",
      views: body.views || 0,
      // time: body.time || "0", - time will be set in schema
      subscribers: body.subscribers || 0,
      likes: body.likes || 0,
      description: body.description || "",
      avatar: body.avatar || "",
      videoUrl: videoLink,
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
    const videos = await this.find();
    return videos.map(video => {
      video.videoUrl = `http://localhost:80${video.videoUrl}`;
      return video;
    });
  } catch (err) {
    throw new Error('Error fetching videos: ' + err.message);
  }
};

videoSchema.statics.deleteVideo = async function (videoId) {
  try {
    const video = await this.findByIdAndDelete(videoId);
    if (video) {
      //deleting file from server
      const videoFilePath = path.join(__dirname, '../localVideos', path.basename(video.videoUrl));
      fs.unlinkSync(videoFilePath); 
    }
    return video;
  } catch (err) {
    throw new Error('Error deleting video: ' + err.message);
  }
};

videoSchema.statics.editVideo = async function (videoId, updateData) {
  try {
    const video = await this.findByIdAndUpdate(videoId, { $set: updateData }, { new: true }); //check this
    return video;
  } catch (err) {
    throw new Error('Error editing video: ' + err.message);
  }
};

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
