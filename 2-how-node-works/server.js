const { createServer } = require('http');

const hostName = 'localhost';
const port = 8080;
const baseURL = `http://${hostName}:${port}`;

const server = createServer();

server
  .on('request', (_req, res) => {
    console.log('Request received');
    res.write("Here's your response!\n");
  })
  .on('request', (_req, res) => {
    console.log('Same request');
    res.end('Another response to the same request!');
  })
  .on('close', () => {
    console.log('Server closed');
  })
  .listen(port, hostName, () => {
    console.log(`Listening on ${baseURL}...`);
    setTimeout(() => server.close(), 5000);
  });

// server.close() only called when no requests are sent??
