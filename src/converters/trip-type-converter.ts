import { tripType } from '@/models/trip-type';

export function convertTripTypeDatesToDateFormat(
    value: tripType[],
): tripType[] {
    return value.map((trip) => {
        debugger;
        return {
            ...trip,
            startDate: new Date(trip.startDate),
            endDate: new Date(trip.endDate),
            attractions: trip.attractions.map((attraction) => {
                return {
                    ...attraction,
                    details: {
                        ...attraction.details,
                        date: new Date(attraction.details.date),
                    },
                };
            }),
        };
    }) as tripType[];
}
