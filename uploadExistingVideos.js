const fs = require('fs-extra');
const path = require('path');
const mongoose = require('mongoose');
const Video = require('./models/videoModel');
const Comment = require('./models/commentModel');
const addDefaultUsers = require('./addDefaultUsers');

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');

  //add default users and get their IDs
  const defaultUsersIds = await addDefaultUsers();
  await uploadAllVideos(defaultUsersIds);

}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

//path to the localVideos directory
const localVideosPath = path.join(__dirname, 'localVideos');
const jsonFilePath = path.join(__dirname, 'public', 'videoList.json');

console.log('JSON file path:', jsonFilePath);

//function to convert string numbers with suffixes (e.g., '8M', '10B') to actual numbers
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

//function to convert a numeric time value to a valid date
function convertTimeToDate(time) {
  if (!isNaN(time)) {
    const days = parseInt(time, 10);
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
  //convert string to Date object if already in valid format
  return new Date(time); 
}

//function to upload a video
async function uploadVideo(videoData, defaultUsersIds) {
  const { title, artist, views, time, subscribers, likes, description, avatar, videoUrl, comments } = videoData;

  const userId = defaultUsersIds[artist];

  if (!userId) {
    console.error(`UserId not found for artist: ${artist}`);
    return;
  }

  //convert views, subscribers to numbers and time to Date
  const viewsNumber = convertStringToNumber(views);
  const subscribersNumber = convertStringToNumber(subscribers);
  const timeValue = convertTimeToDate(time);

  //create relative file path
  const filePath = path.join('/localVideos', path.basename(videoUrl));

  //validate video data
  if (!title || !artist || !videoUrl) {
    console.error('Missing required video data:', videoData);
    return;
  }

  try {
    const video = new Video({
      userId,
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

//function to read and upload all videos from the JSON file
async function uploadAllVideos(defaultUsersIds) {
  try {
    const videoData = await fs.readJson(jsonFilePath);
    for (const video of videoData) {
      await uploadVideo(video, defaultUsersIds);
    }
    console.log('All videos uploaded');
  } catch (err) {
    console.error(`Error reading JSON file: ${err.message}`);
  } finally {
    mongoose.disconnect();
  }
}