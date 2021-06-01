import { Router } from 'express';
import {
    addTrip,
    deleteTrip,
    getAllTrips,
    updateTrip,
} from '../controllers/Trips';

const tripRouter = Router();
tripRouter.get('/', getAllTrips);
tripRouter.post('/add', addTrip);
tripRouter.put('/update', updateTrip);
tripRouter.delete('/delete/:id', deleteTrip);

export default tripRouter;
