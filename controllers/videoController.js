const Video = require('../models/videoModel');
const net = require('net');

// Function to communicate with C++ server to get recommended videos
async function getRecommendedVideosFromCppServer(userId, videoId) {
  return new Promise((resolve, reject) => {
    const serverAddress = '127.0.0.1'; // IP address of the C++ server
    const serverPort = 5555; // The port the server is listening on
    
    // Create a connection to the C++ server
    const client = new net.Socket();
    
    client.connect(serverPort, serverAddress, () => {
      console.log('Connected to C++ server');
      const message = `${userId}:${videoId}`;  // Send the user ID and video ID in the format "userId:videoId"
      console.log(`Sending to server: ${message}`);
      client.write(message);
    });

    // Receive response from the server
    client.on('data', (data) => {
      const response = data.toString();
      const recommendedVideos = response.split(' ').slice(2); // Parse the recommended video IDs from the server response
      console.log('Received recommended videos:', recommendedVideos);
      client.destroy(); // Close the connection
      resolve(recommendedVideos);
    });

    // Handle connection close
    client.on('close', () => {
      console.log('Connection to C++ server closed');
    });

    // Handle errors
    client.on('error', (err) => {
      console.error('Error connecting to C++ server:', err.message);
      reject(err);
    });
  });
}

// Function to get recommended videos
exports.getRecommendedVideos = async (req, res) => {
  try {
    //fetch videos from server
    const userId = req.params.userId;
    const videoId = req.params.videoId;
    let recommendedVideoIds = await getRecommendedVideosFromCppServer(userId, videoId);

    // Fetch the top 6 videos with the most views
    const topVideos = await Video.find()
      .sort({ views: -1 }) // Sort videos by views in descending order
      .limit(6)             // Limit the result to 6 videos
      .lean();              // Get plain JavaScript objects

    console.log(topVideos);

    res.status(200).json({
      message: 'Recommended videos fetched successfully',
      videos: topVideos
    });
    console.log("Recommended videos fetched successfully");
  } catch (error) {
    console.error('Error fetching recommended videos:', error.message);
    res.status(500).json({ message: 'Error fetching recommended videos', error });
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    //log the request
    console.log('Received file:', req.file);
    console.log('Received body:', req.body);
    console.log('Received userId:', req.params.userId);
    
    if (!req.file) {
      console.error('No video file provided');
      return res.status(400).json({ message: 'No video file provided' });
    }

    //call the upload function
    const video = await Video.uploadVideo(req.file, req.body);
    res.status(201).json({ message: 'Video uploaded successfully', video });
  } catch (error) {
    console.error('Error uploading video:', error.message);
    res.status(500).json({ message: 'Error uploading video', error });
  }
};

//function to get all the videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.getAllVideos();
    res.status(200).json({ message: 'Videos fetched successfully', videos });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error });
  }
};

//function to get a video
exports.getVideo = async (req, res) => {
  try{
    console.log(`Attempting to fetch video with ID: ${req.params.pid}`);
    const video = await Video.getVideo(req.params.pid);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ message: 'Video fetched successfully', video});
  }
  catch(error){
    res.status(500).json({ message: 'Error fetching video', error });
  }
}

//function to delete video from the server
exports.deleteVideo = async (req, res) => {
  console.log(`Attempting to delete video with ID: ${req.params.pid}`);
  try {
    const video = await Video.deleteVideo(req.params.pid);
    console.log(video);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error });
  }
};

//function to edit a video in the list
exports.editVideo = async (req, res) => {
  try {
    console.log(`Attempting to edit video with ID: ${req.params.pid}`);
    const video = await Video.editVideo(req.params.pid, req.body);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    return res.status(200).json({ message: 'Video edited successfully', video });
  } catch (error) {
    res.status(500).json({ message: 'Error editing video', error });
  }
};

exports.getVideosByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const videos = await Video.getVideosByUserId(userId);
    res.status(200).json({ message: 'Videos fetched successfully', videos : videos });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos by user ID', error });
  }
};

exports.addView = async (req,res) => {
  try{
    console.log(`Attempting to add vieww video with ID: ${req.params.pid}`);
    const video = await Video.addView(req.params.pid);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    return res.status(200).json({ message: 'view added successfully', video });
  }
  catch(error){
    res.status(500).json({ message: 'Error view added video', error });
  }
}