const http = require('http');

// Define the port the server will listen on
const PORT = 3000;

// Create a server
const server = http.createServer((req, res) => {
  // Set the response header content type
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send a response message
  res.end('Hello, World!\n');
});

// Start the server and listen on the defined port
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});