import { Schema, Document, model } from 'mongoose';

export interface TripDocument extends Document {
    destination: string;
    attractions: [string];
    startDate: [Date];
    endDate: [Date];
}

const TripSchema: Schema = new Schema(
    {
        destination: { type: String, requiered: true },
        attraction: [{ type: Schema.Types.ObjectId, ref: 'attraction' }],
        startDate: { type: Date, requiered: true },
        endDate: { type: Date, requiered: true },
    },
    { collection: 'trips' }
);

export default model<TripDocument>('trips', TripSchema);
