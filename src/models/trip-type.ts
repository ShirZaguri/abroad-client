import { tripAttractionType } from './trip-attraction-type';

export type tripType = {
    _id?: string;
    destination: string;
    attractions: [tripAttractionType];
    startDate: Date;
    endDate: Date;
    img: string;
};
