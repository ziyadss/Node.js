const { Router } = require('express');

const {
  validateTour,
  findTourIndex,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('./controllers/tours');

const router = Router().param('id', findTourIndex);

router.route('/').get(getAllTours).post(validateTour, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
