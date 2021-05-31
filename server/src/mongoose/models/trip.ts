import { Schema, Document, model } from 'mongoose';

export interface TripDocument extends Document {
  destination: string;
  attractions: [string];
}

const TripSchema: Schema = new Schema({
  destination: { type: String, requiered: true },
  attraction: [{ type: Schema.Types.ObjectId, ref: 'attraction' }],
});

export default model<TripDocument>('trip', TripSchema);
