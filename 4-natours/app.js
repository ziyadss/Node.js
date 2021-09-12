const express = require('express');
const morgan = require('morgan');
const api = require('./api');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json()).use(express.static('./public')).use('/api', api);

module.exports = app;
