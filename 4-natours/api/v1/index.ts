import { Router } from 'express';
// import users from './routes/users';
import tours from './routes/tours';

const router = Router().use('/tours', tours); // .use('/users', users);

export default router;
