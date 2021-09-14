const { Router } = require('express');
const users = require('./routes/users');
const tours = require('./routes/tours');

const router = Router().use('/users', users).use('/tours', tours);

module.exports = router;
