const Video = require('../models/videoModel');


// a function to uploud a new video - create one
exports.uploadVideo = async (req, res) => {
  try {
    const video = await Video.uploadVideo(req.file, req.body);
    res.status(201).json({ message: 'Video uploaded successfully', video });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading video', error });
  }
};

// to get all the videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.getAllVideos();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error });
  }
};
