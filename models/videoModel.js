const mongoose = require('mongoose');

//system of files in node.js for delete 
const fs = require('fs');
const path = require('path');

//the schema for a collection video
const videoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
    const videoData = {
      userId: body.userId,
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

videoSchema.statics.getVideo = async function (videoId) {
  try{
    const video = await this.findById(videoId);
    if (!video) {
      throw new Error('Video not found');
    }
    return video;
  }
  catch(error){
    throw new Error('Error fetching videos: ' + error.message);
  }
}

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
    const video = await this.findByIdAndUpdate(videoId, { $set: updateData }, { new: true });
    return video;
  } catch (err) {
    throw new Error('Error editing video: ' + err.message);
  }
};

videoSchema.statics.getVideosByUserId = async function (userId) {
  try {
    const videos = await this.find({ userId: userId });
    return videos;
  } catch (err) {
    throw new Error('Error fetching videos by user ID: ' + err.message);
  }
};

videoSchema.statics.addView = async function (videoId) {
  try {
    const video = await this.findByIdAndUpdate(
      videoId,
      { $inc: { views: 1 } }, // Increment the views field by 1
      { new: true }
    );
    return video;
  } catch (err) {
    throw new Error('Error updating video views: ' + err.message);
  }
};


const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
