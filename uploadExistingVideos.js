const fs = require('fs-extra');
const path = require('path');
const mongoose = require('mongoose');
const Video = require('./models/videoModel');
const Comment = require('./models/commentModel');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ourDatabase', {
  // הסרת אופציות מיותרות
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Path to the localVideos directory
const localVideosPath = path.join(__dirname, 'localVideos');
const jsonFilePath = path.join(__dirname, 'public', 'videoList.json');

console.log('JSON file path:', jsonFilePath);

// Function to convert string numbers with suffixes (e.g., '8M', '10B') to actual numbers
function convertStringToNumber(value) {
  if (typeof value === 'string') {
    if (value.endsWith('M')) {
      return parseFloat(value) * 1000000;
    } else if (value.endsWith('B')) {
      return parseFloat(value) * 1000000000;
    }
  }
  return parseFloat(value);
}

// Function to convert a numeric time value to a valid date
function convertTimeToDate(time) {
  if (!isNaN(time)) {
    const days = parseInt(time, 10);
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
  return new Date(time); // Convert ISO string to Date object if already in valid format
}

// Function to upload a video
async function uploadVideo(videoData) {
  const { title, artist, views, time, subscribers, likes, description, avatar, videoUrl, comments } = videoData;

  // Convert views, subscribers to numbers and time to Date
  const viewsNumber = convertStringToNumber(views);
  const subscribersNumber = convertStringToNumber(subscribers);
  const timeValue = convertTimeToDate(time);

  // Create relative file path
  const filePath = path.join('/localVideos', path.basename(videoUrl));

  // Validate video data
  if (!title || !artist || !videoUrl) {
    console.error('Missing required video data:', videoData);
    return;
  }

  try {
    const video = new Video({
      title,
      artist,
      views: viewsNumber,
      time: timeValue,
      subscribers: subscribersNumber,
      likes,
      description,
      avatar,
      videoUrl: filePath,
      comments: []
    });

    for (const commentData of comments) {
      const comment = new Comment(commentData);
      await comment.save();
      video.comments.push(comment);
    }

    await video.save();
    console.log(`Video uploaded: ${video.title}`);
  } catch (err) {
    console.error(`Error uploading video: ${err.message}`);
  }
}

// Function to read and upload all videos from the JSON file
async function uploadAllVideos() {
  try {
    const videoData = await fs.readJson(jsonFilePath);
    for (const video of videoData) {
      await uploadVideo(video);
    }
    console.log('All videos uploaded');
  } catch (err) {
    console.error(`Error reading JSON file: ${err.message}`);
  } finally {
    mongoose.disconnect();
  }
}

// Start uploading
uploadAllVideos();
