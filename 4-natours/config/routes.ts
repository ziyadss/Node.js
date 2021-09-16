import { Router } from 'express';
import apiV1 from '../api/v1';

const router = Router().use('/api/v1', apiV1);

export default router;
