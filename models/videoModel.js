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
  artist: { //fix this in order to connet with thie artist user
    type: String,
    required: true
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    // required: true
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
    const videoData = {
      title: body.title,
      artist: body.artist || "title",
      views: body.views || 0,
      subscribers: body.subscribers || 0,
      likes: body.likes || 0,
      description: body.description || "",
      avatar: body.avatar || "",
      videoUrl: videoLink,
      comments: JSON.parse(body.comments) || []
    };
    const newVideo = new this(videoData);
    const savedVideo = await newVideo.save();
    console.log('Video saved to MongoDB successfully:', savedVideo);
    return savedVideo;
  } catch (error) {
    console.error('Error creating video:', error.message);
    throw new Error('Error creating video: ' + error.message);
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
    console.log("!!!!!");
    if (video) {
      const videoFilePath = path.join(__dirname, '../localVideos', path.basename(video.videoUrl));
      fs.unlinkSync(videoFilePath); //deleting file from server
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
