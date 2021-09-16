import { Router } from 'express';
import tours from './routes/tours';
import users from './routes/users';

const router = Router().use('/users', users).use('/tours', tours);

export default router;
