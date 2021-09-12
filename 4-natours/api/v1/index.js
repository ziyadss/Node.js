const { Router } = require('express');
const users = require('./users');
const tours = require('./tours');

const router = Router().use('/users', users).use('/tours', tours);

module.exports = router;
