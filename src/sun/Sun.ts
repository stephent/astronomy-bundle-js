import {observationCalc} from '../utils';
import AstronomicalObject from '../astronomicalObject/AstronomicalObject';
import {EclipticSphericalCoordinates, RectangularCoordinates} from '../coordinates/types/CoordinateTypes';
import {
    earthEclipticSpherical2sunEclipticSpherical,
    spherical2rectangular,
} from '../coordinates/calculations/coordinateCalc';
import TimeOfInterest from '../time/TimeOfInterest';
import Earth from '../earth/Earth';
import {createEarth} from '../earth';
import {correctEffectOfAberration, correctEffectOfNutation} from '../coordinates/calculations/apparentCoordinateCalc';
import {Location} from '../earth/types/LocationTypes';
import {createTimeOfInterest} from '../time';
import {getRise, getSet, getTransit} from '../utils/riseSetTransitCalc';
import {
    STANDARD_ALTITUDE_SUN_CENTER_REFRACTION,
    STANDARD_ALTITUDE_SUN_UPPER_LIMB_REFRACTION,
} from '../constants/standardAltitude';
import {DIAMETER_SUN} from './constants/diameters';

export default class Sun extends AstronomicalObject {
    private readonly earth: Earth;

    public constructor(toi?: TimeOfInterest) {
        super(toi, 'sun');

        this.earth = createEarth(toi);
    }

    public async getHeliocentricEclipticRectangularJ2000Coordinates(): Promise<RectangularCoordinates> {
        return Promise.resolve({x: 0, y: 0, z: 0});
    }

    public async getHeliocentricEclipticRectangularDateCoordinates(): Promise<RectangularCoordinates> {
        return Promise.resolve({x: 0, y: 0, z: 0});
    }

    public async getHeliocentricEclipticSphericalJ2000Coordinates(): Promise<EclipticSphericalCoordinates> {
        return Promise.resolve({lon: 0, lat: 0, radiusVector: 0});
    }

    public async getHeliocentricEclipticSphericalDateCoordinates(): Promise<EclipticSphericalCoordinates> {
        return Promise.resolve({lon: 0, lat: 0, radiusVector: 0});
    }

    public async getGeocentricEclipticRectangularJ2000Coordinates(): Promise<RectangularCoordinates> {
        const coords = await this.getGeocentricEclipticSphericalJ2000Coordinates();

        return spherical2rectangular(coords);
    }

    public async getGeocentricEclipticRectangularDateCoordinates(): Promise<RectangularCoordinates> {
        const coords = await this.getGeocentricEclipticSphericalDateCoordinates();

        return spherical2rectangular(coords);
    }

    public async getGeocentricEclipticSphericalJ2000Coordinates(): Promise<EclipticSphericalCoordinates> {
        const coords = await this.earth.getHeliocentricEclipticSphericalJ2000Coordinates();

        return earthEclipticSpherical2sunEclipticSpherical(coords);
    }

    public async getGeocentricEclipticSphericalDateCoordinates(): Promise<EclipticSphericalCoordinates> {
        const coords = await this.earth.getHeliocentricEclipticSphericalDateCoordinates();

        return earthEclipticSpherical2sunEclipticSpherical(coords);
    }

    public async getApparentGeocentricEclipticSphericalCoordinates(): Promise<EclipticSphericalCoordinates> {
        let coords = await this.getGeocentricEclipticSphericalDateCoordinates();

        coords = correctEffectOfAberration(coords, this.T);
        coords = correctEffectOfNutation(coords, this.T);

        return coords;
    }

    public async getTransit(location: Location): Promise<TimeOfInterest> {
        const jd = await getTransit(Sun, location, this.jd0);

        return createTimeOfInterest.fromJulianDay(jd);
    }

    public async getRise(
        location: Location,
        standardAltitude: number = STANDARD_ALTITUDE_SUN_CENTER_REFRACTION,
    ): Promise<TimeOfInterest> {
        const jd = await getRise(Sun, location, this.jd0, standardAltitude);

        return createTimeOfInterest.fromJulianDay(jd);
    }

    public async getRiseUpperLimb(location: Location): Promise<TimeOfInterest> {
        return await this.getRise(location, STANDARD_ALTITUDE_SUN_UPPER_LIMB_REFRACTION);
    }

    public async getSet(
        location: Location,
        standardAltitude: number = STANDARD_ALTITUDE_SUN_CENTER_REFRACTION,
    ): Promise<TimeOfInterest> {
        const jd = await getSet(Sun, location, this.jd0, standardAltitude);

        return createTimeOfInterest.fromJulianDay(jd);
    }

    public async getSetUpperLimb(location: Location): Promise<TimeOfInterest> {
        return await this.getSet(location, STANDARD_ALTITUDE_SUN_UPPER_LIMB_REFRACTION);
    }

    public async getAngularDiameter(): Promise<number> {
        const distance = await this.getApparentDistanceToEarth();

        return observationCalc.getAngularDiameter(distance, DIAMETER_SUN);
    }

    public async getTopocentricAngularDiameter(location: Location): Promise<number> {
        const distance = await this.getTopocentricDistanceToEarth(location);

        return observationCalc.getAngularDiameter(distance, DIAMETER_SUN);
    }

    public async getApparentMagnitude(): Promise<number> {
        return Promise.resolve(-26.74);
    }

    public async getTopocentricApparentMagnitude(): Promise<number> {
        return Promise.resolve(-26.74);
    }
}
