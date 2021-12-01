import { tripAttractionType } from '@/utils/types/trip-attraction-type';

export default class AttractionService {
    static async updateAttraction(
        tripAttraction: tripAttractionType,
    ): Promise<tripAttractionType> {
        const data = await fetch(process.env.VUE_APP_UPDATE_ATTRACTION, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripAttraction),
        });

        return await data.json();
    }

    static async deleteAttraction(
        tripAttraction: tripAttractionType,
    ): Promise<tripAttractionType> {
        const data = await fetch(process.env.VUE_APP_DELETE_ATTRACTION, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripAttraction),
        });

        return await data.json();
    }
}
