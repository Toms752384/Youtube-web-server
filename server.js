const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/usersRoutes');
const videoRoutes = require('./routes/videoRoutes');
const multer = require('multer');

const server = express();
const port = 80;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/ourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// to add the videos to the folder - local Videos
server.use('/localVideos', express.static(path.join(__dirname, 'localVideos')));

// connect the videos
server.use('/videos', videoRoutes);

server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

server.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

server.use(cookieParser());
server.use('/users', userRoutes);

// this is fro the HTML i need to take it downnnnnnnnnnnnn
server.use(express.static('public'));

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
