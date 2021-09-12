const { Router } = require('express');

const router = Router();

router.all('*', (req, res) => {
  res.status(501).json({
    status: 'error',
    message: `Route not found, please use API v1 at /api/v1${req.url}`,
  });
});

module.exports = router;
