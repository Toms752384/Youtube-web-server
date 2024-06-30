const Video = require('../models/videoModel');


//function to uploud a new video - creates one
// exports.uploadVideo = async (req, res) => {
//   try {
//     const video = await Video.uploadVideo(req.file, req.body);
//     res.status(201).json({ message: 'Video uploaded successfully', video });
//   } catch (error) {
//     res.status(500).json({ message: 'Error uploading video', error });
//   }
// };

exports.uploadVideo = async (req, res) => {
  try {
    console.log('Received file:', req.file);
    console.log('Received body:', req.body);

    // בדוק אם הקובץ קיים בתיקייה
    // const filePath = path.join(__dirname, '../localVideos', req.file.filename);
    // if (fs.existsSync(filePath)) {
    //   console.log('File saved successfully at:', filePath);
    // } else {
    //   console.error('File not found at:', filePath);
    // }

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

//function to delete video from the server
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

//function to edit a video in the list
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
