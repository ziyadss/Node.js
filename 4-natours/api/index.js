const { Router } = require('express');
const users = require('./v1');
const tours = require('./v2');

const router = Router();
router.use('/v1', users).use('/v2', tours);

module.exports = router;
