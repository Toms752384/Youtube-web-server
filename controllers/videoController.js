const Video = require('../models/videoModel');

exports.uploadVideo = async (req, res) => {
  try {
    //log the request
    console.log('Received file:', req.file);
    console.log('Received body:', req.body);

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