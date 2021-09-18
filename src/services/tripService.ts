import { tripType } from '@/utils/types/trip-type';

export default class TripService {
    static async getTrips(): Promise<tripType[]> {
        const data = await fetch(process.env.VUE_APP_GET_TRIPS);
        return (await data.json()).trips as tripType[];
    }
}
