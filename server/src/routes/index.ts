import { Router } from 'express';
import tripRouter from './trip';

// Export the base-router
const baseRouter = Router();

baseRouter.use('/trips', tripRouter);

export default baseRouter;
