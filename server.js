const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/usersRoutes');

//create app and port
const server = express();
const port = 80;

//middleware for parsing JSON bodies
server.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//CORS configuration
server.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow credentials (cookies)
}));

//handle preflight requests for all routes
server.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//middleware for parsing cookies
server.use(cookieParser());

//users routes
server.use('/users', userRoutes);

//start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});