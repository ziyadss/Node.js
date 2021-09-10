const { createReadStream } = require('fs');
const { readFile } = require('fs/promises');
const { createServer } = require('http');

const hostName = 'localhost';
const port = 8080;
const baseURL = `http://${hostName}:${port}`;

//  Obviously optimally file would be read outside of the function, just once
//  But assuming file would be different for each request
createServer()
  .on('request', (_req, res) => {
    //  Solution 1
    // readFile('test-file.txt')
    //   .then((data) => res.end(data))
    //   .catch((err) => console.log(err));

    //  Solution 2: streams, manual
    //   createReadStream('test-file.txt')
    //     .on('data', (chunk) => res.write(chunk))
    //     .on('end', () => res.end())
    //     .on('error', (err) => {
    //       console.log(err);
    //       res.statusCode = 500;
    //       res.end('An error occurred');
    //     });

    //  Solution 3: streams, pipe
    createReadStream('test-file.txt').pipe(res);
  })
  .listen(port, hostName, () => {
    console.log(`Listening on ${baseURL}...`);
  });
