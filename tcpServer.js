const net = require('net');

// Function to send userID and videoID to the C++ server and get recommended videos
async function getRecommendedVideosFromCppServer(userID, videoID) {
  return new Promise((resolve, reject) => {
    const serverAddress = '127.0.0.1'; // IP address of the C++ server
    const serverPort = 5555; // The port the server is listening on
    
    // Create a connection to the C++ server
    const client = new net.Socket();
    
    client.connect(serverPort, serverAddress, () => {
      console.log('Connected to C++ server');

      // Send the user ID and video ID in the format "userID:videoID"
      const message = `${userID}:${videoID}`;
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

module.exports = { getRecommendedVideosFromCppServer };