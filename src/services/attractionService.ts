import { tripAttractionType } from '@/utils/types/trip-attraction-type';

export default class AttractionService {
    static async updateAttraction(
        tripId: string,
        tripAttraction: tripAttractionType,
    ): Promise<tripAttractionType> {
        const data = await fetch(process.env.VUE_APP_UPDATE_ATTRACTION, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...tripAttraction, _id: tripId }),
        });

        return await data.json();
    }
}
