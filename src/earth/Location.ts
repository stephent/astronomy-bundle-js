import {Location as LocationType} from './types/LocationTypes';

export default class Location {
    private readonly location: LocationType;

    constructor(
        public readonly lat: number,
        public readonly lon: number,
        public readonly elevation: number = 0,
    ) {
        this.location = {lat, lon, elevation};
    }

    public getLatitude(): number {
        return this.location.lat;
    }

    public getLongitude(): number {
        return this.location.lon;
    }

    public getElevation(): number {
        return this.location.elevation;
    }
}
