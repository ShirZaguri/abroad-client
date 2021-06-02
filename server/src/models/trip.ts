import Attraction from '@entities/Attraction';
import { Schema, Document, model } from 'mongoose';

export interface TripDocument extends Document {
    destination: string;
    attractions: [{ attraction: Attraction; date: Date }];
    startDate: [Date];
    endDate: [Date];
}

const TripSchema: Schema = new Schema(
    {
        destination: { type: String, requiered: true },
        attractions: [
            {
                attraction: {
                    type: Schema.Types.ObjectId,
                    ref: 'attraction',
                    requiered: false,
                },
                date: { type: Date, requiered: false },
            },
        ],
        startDate: { type: Date, requiered: true },
        endDate: { type: Date, requiered: true },
    },
    { collection: 'trips' }
);

export default model<TripDocument>('trips', TripSchema);
