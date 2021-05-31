import Attraction from './Attraction';

export interface ITrip {
    destination: string;
    attractions: [Attraction];
    startDate: Date;
    endDate: Date;
}

// TODO: update entity
class Trip implements ITrip {
    public id: number;
    public destination: string;
    public attractions: [Attraction];
    public startDate: Date;
    public endDate: Date;

    constructor(
        id: number,
        destination: string,
        attractions: [Attraction],
        startDate: Date,
        endtDate: Date
    ) {
        this.id = id;
        this.destination = destination;
        this.attractions = attractions;
        this.startDate = startDate;
        this.endDate = endtDate;
    }
}

export default Trip;
