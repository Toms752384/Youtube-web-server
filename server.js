const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/usersRoutes');

//create app and port
const app = express();
const port = 80;

//middleware for parsing JSON bodies
app.use(bodyParser.json());

//CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow credentials (cookies)
}));

//handle preflight requests for all routes
app.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//middleware for parsing cookies
app.use(cookieParser());

//users routes
app.use('/users', userRoute);

//start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});