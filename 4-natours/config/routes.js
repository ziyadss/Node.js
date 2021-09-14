const { Router } = require('express');
const apiV1 = require('../api/v1');

const router = Router().use('/api/v1', apiV1);

module.exports = router;
