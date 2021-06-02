import Attraction from '@entities/Attraction';
import Trip from '@entities/Trip';
import { Types } from 'mongoose';
import trips from '../models/trip';
import attractions from '../models/attraction';

export class tripService {
    static getAll = async () => {
        return await trips.find({});
        // .populate('attractions.attraction').exec();
    };

    static add = async (trip: Trip) => {
        return await trips.create({ ...trip }, function (err, r) {
            if (err) {
                console.log('error inserting' + err);
            }
        });
    };
    static addAttraction = async (attraction: Attraction, _id: any) => {
        return await attractions.create(
            { ...attraction },
            async (err, addedAttraction) => {
                if (err) {
                    console.log('error occurd while adding attractions' + err);
                }
                const attractionId = addedAttraction._id;
                return await trips.updateOne(
                    { _id: _id },
                    {
                        $push: {
                            attractions: {
                                attraction: attractionId,
                                date: new Date(),
                            },
                        },
                    }
                );
            }
        );
    };

    static update = async (trip: any) => {};

    static delete = async (id: number) => {
        await trips.deleteOne({ _id: new Types.ObjectId(id) });
    };
}
