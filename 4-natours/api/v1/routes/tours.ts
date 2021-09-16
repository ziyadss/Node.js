import { Router } from 'express';

import {
  aliasTopTours,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} from '../controllers/tour';

const router = Router(); // .param('id', findTourIndex);

router.route('/').get(getAllTours).post(/* validateTour, */ createTour);
router.route('/top-5').get(aliasTopTours, getAllTours);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
