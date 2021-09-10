import { createServer } from 'http';

const server = createServer();

const hostName = 'localhost';
const port = 8080;
const baseURL = `http://${hostName}:${port}`;

server.on('request', (_req, res) => {
  console.log('Request received');
  res.write("Here's your response!\n");
});

server.on('request', (_req, res) => {
  console.log('Same request');
  res.end('Another response to the same request!');
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen(port, hostName, () => {
  console.log(`Listening on ${baseURL}...`);
  setTimeout(() => server.close(), 5000);
});

// server.close() only called when no requests are sent??
