const Video = require('../models/videoModel');


//function to uploud a new video - creates one
exports.uploadVideo = async (req, res) => {
  try {
    const video = await Video.uploadVideo(req.file, req.body);
    res.status(201).json({ message: 'Video uploaded successfully', video });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading video', error });
  }
};

//function to get all the videos - start here
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.getAllVideos();
    res.status(200).json({ message: 'Videos fetched successfully', videos });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.deleteVideo(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error });
  }
};

exports.editVideo = async (req, res) => {
  try {
    const video = await Video.editVideo(req.params.id, req.body);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ message: 'Video edited successfully', video });
  } catch (error) {
    res.status(500).json({ message: 'Error editing video', error });
  }
};
