const net = require('net');

// Server address and port
const serverAddress = '127.0.0.1'; // IP address of the C++ server
const serverPort = 5555; // The port the server is listening on

// Create a connection to the server
const client = new net.Socket();
client.connect(serverPort, serverAddress, () => {
  console.log('Connected to C++ server');

  // Send a message to the server
  const message = "Hello from Node.js client!";
  client.write(message);
});

// Receive response from the server
client.on('data', (data) => {
  console.log('Received from server:', data.toString());

  // Close the connection after receiving the response
  client.destroy(); 
});

// Handle connection close
client.on('close', () => {
  console.log('Connection closed');
});

// Handle errors
client.on('error', (err) => {
  console.error('Error:', err.message);
});
