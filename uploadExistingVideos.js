const fs = require('fs-extra');
const path = require('path');
const mongoose = require('mongoose');
const Video = require('./models/videoModel');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Path to the localVideos directory
const localVideosPath = path.join(__dirname, 'localVideos');

// Function to upload a video
async function uploadVideo(filePath) {
  const fileName = path.basename(filePath);
  const title = path.parse(fileName).name; // Use file name as title - fix this
  const artist = "title";
  const views = 0;
  const subscribers = 0;
  const likes = 0;
  const description = `Uploaded from ${fileName}`;
  const avatar = "fdg";
  const comments = [];

  const file = {
    filename: fileName,
    path: filePath
  };

  try {
    const video = await Video.uploadVideo(file, { title, artist, views, subscribers, likes, avatar, description, comments });
    console.log(`Video uploaded: ${video.title}`);
  } catch (err) {
    console.error(`Error uploading video: ${err.message}`);
  }
}

// Function to read and upload all videos in the localVideos directory
async function uploadAllVideos() {
  try {
    const files = await fs.readdir(localVideosPath);
    for (const file of files) {
      const filePath = path.join(localVideosPath, file);
      await uploadVideo(filePath);
    }
    console.log('All videos uploaded');
    mongoose.disconnect();
  } catch (err) {
    console.error(`Error reading files: ${err.message}`);
    mongoose.disconnect();
  }
}

// Start uploading
uploadAllVideos();
