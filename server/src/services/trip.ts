import { Types } from 'mongoose';
import trip from '../models/trip';

export class tripService {
    static getAll = async () => {
        return await trip.find({});
    };

    static add = async (trip: any) => {
        return await trip.create({});
    };

    static update = async (trip: any) => {};

    static delete = async (id: number) => {
        await trip.deleteOne({ _id: new Types.ObjectId(id) });
    };
}
