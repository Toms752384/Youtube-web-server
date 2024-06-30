const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/usersRoutes');
const videoRoutes = require('./routes/videoRoutes');
const multer = require('multer');

//prolog
const server = express();
const port = 80;

//parsing json formats
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

//connect to databse
mongoose.connect('mongodb://localhost:27017/ourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//add the videos to the folder - local Videos
server.use('/localVideos', express.static(path.join(__dirname, 'localVideos')));

//cors configuration
server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

server.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//routes of server
server.use('/users', userRoutes);
server.use('/videos', videoRoutes);

//define the port
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
