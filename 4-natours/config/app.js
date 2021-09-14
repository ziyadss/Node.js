const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

const { json, static } = express;
const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app
  .use(json())
  .use(static(`${__dirname}/../public`))
  .use(routes);

module.exports = app;
