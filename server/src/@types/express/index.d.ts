import { IUser } from '@entities/Trip';
// TODO: delete user not exist
declare module 'express' {
    export interface Request {
        body: {
            user: IUser;
            trip: any;
        };
    }
}
