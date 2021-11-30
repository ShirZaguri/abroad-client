import { attractionType } from './attraction-type';

export type tripAttractionType = {
    _id: string;
    attraction: attractionType;
    details: {
        date: Date;
        price: number;
        done?: boolean;
    };
};
