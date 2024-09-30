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
    const userId = req.params.userId;
    const videoId = req.params.videoId;

    // Step 1: Get recommended videos from the C++ server
    let recommendedVideoIds = await getRecommendedVideosFromCppServer(userId, videoId);

    // Step 2: If the list is greater than 6, take the first 6, else fill randomly till 6
    // if (recommendedVideoIds.length >= 6) {
      // recommendedVideoIds = recommendedVideoIds.slice(0, 6);
    // } else {
      // Fetch all videos from MongoDB (or limit the query to prevent performance issues)
      const allVideos = await Video.find().lean();
      console.log(allVideos); //
      // const remainingCount = 6 - recommendedVideoIds.length;

      // // Randomly select videos from all available videos to fill up to 6 if needed
      // while (recommendedVideoIds.length < 6) {
      //   const randomIndex = Math.floor(Math.random() * allVideos.length);
      //   const randomVideo = allVideos[randomIndex];
      //   if (!recommendedVideoIds.includes(randomVideo._id.toString())) {
      //     recommendedVideoIds.push(randomVideo._id.toString());
      //   }
      // }
    // }

    // Step 3: Fetch the recommended videos from MongoDB based on the video IDs
    // const videos = await Video.find({ _id: { $in: recommendedVideoIds } });

    // Step 4: Return the recommended videos to the client
    res.status(200).json({ message: 'Recommended videos fetched successfully', videos: allVideos });
    console.log("again");
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