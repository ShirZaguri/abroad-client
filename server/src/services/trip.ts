import Trip from '@entities/Trip';
import { Types } from 'mongoose';
import trips from '../models/trip';

export class tripService {
    static getAll = async () => {
        return await trips.find({});
    };

    static add = async (trip: Trip) => {
        return await trips.create({ ...trip }, function (err, r) {
            if (err) {
                console.log('error inserting' + err);
            }
        });
    };

    static update = async (trip: any) => {};

    static delete = async (id: number) => {
        await trips.deleteOne({ _id: new Types.ObjectId(id) });
    };
}
