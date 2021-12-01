import { tripAttractionType } from '@/utils/types/trip-attraction-type';

export default class AttractionService {
    static async updateAttraction(
        tripId: string,
        attraction: tripAttractionType,
    ): Promise<tripAttractionType> {
        const data = await fetch(process.env.VUE_APP_UPDATE_ATTRACTION, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tripId, ...attraction }),
        });

        return await data.json();
    }
}
