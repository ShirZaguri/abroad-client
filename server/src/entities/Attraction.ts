export interface IAttraction {
    id: number;
    name: string;
}

class Attraction implements IAttraction {
    public id: number;
    public name: string;

    constructor(attraction: IAttraction) {
        this.name = attraction.name;
        this.id = attraction.id;
    }
}

export default Attraction;
