import express from 'express';

import { readFileSync } from 'fs';

const port = 8080;
const hostName = 'localhost';
const baseURL = `http://${hostName}:${port}`;

const tours = JSON.parse(readFileSync('./dev-data/data/tours-simple.json'));

express()
  .get('/api/v1/tours', (_req, res) =>
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    })
  )
  .post('/', (_req, res) => res.status(201).send('Posted!'))
  .listen(port, hostName, () => console.log(`Server running at ${baseURL}`));
