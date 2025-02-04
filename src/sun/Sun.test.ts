import {createTimeOfInterest} from '../time';
import {round} from '../utils/math';
import {deg2angle} from '../utils/angleCalc';
import {sec2string} from '../time/calculations/timeCalc';
import {createLocation} from '../earth';
import Sun from './Sun';

const toi = createTimeOfInterest.fromTime(2020, 10, 22, 6, 15, 0);
const sun = new Sun(toi);
const location = createLocation(52.519, 13.408);

it('tests if name is correct', () => {
    expect(sun.name).toBe('sun');
});

it('tests getHeliocentricEclipticRectangularJ2000Coordinates', async () => {
    const coords = await sun.getHeliocentricEclipticRectangularJ2000Coordinates();

    expect(coords.x).toBe(0);
    expect(coords.y).toBe(0);
    expect(coords.z).toBe(0);
});

it('tests getHeliocentricEclipticRectangularDateCoordinates', async () => {
    const coords = await sun.getHeliocentricEclipticRectangularDateCoordinates();

    expect(coords.x).toBe(0);
    expect(coords.y).toBe(0);
    expect(coords.z).toBe(0);
});

it('tests getHeliocentricEclipticSphericalJ2000Coordinates', async () => {
    const coords = await sun.getHeliocentricEclipticSphericalJ2000Coordinates();

    expect(coords.lon).toBe(0);
    expect(coords.lat).toBe(0);
    expect(coords.radiusVector).toBe(0);
});

it('tests getHeliocentricEclipticSphericalDateCoordinates', async () => {
    const coords = await sun.getHeliocentricEclipticSphericalDateCoordinates();

    expect(coords.lon).toBe(0);
    expect(coords.lat).toBe(0);
    expect(coords.radiusVector).toBe(0);
});

it('tests getGeocentricEclipticRectangularJ2000Coordinates', async () => {
    const coords = await sun.getGeocentricEclipticRectangularJ2000Coordinates();

    expect(round(coords.x, 8)).toBe(-0.87016292);
    expect(round(coords.y, 8)).toBe(-0.4828331);
    expect(round(coords.z, 8)).toBe(0.00002408);
});

it('tests getGeocentricEclipticRectangularDateCoordinates', async () => {
    const coords = await sun.getGeocentricEclipticRectangularDateCoordinates();

    expect(round(coords.x, 8)).toBe(-0.86770215);
    expect(round(coords.y, 8)).toBe(-0.4872415);
    expect(round(coords.z, 8)).toBe(-0.00000243);
});

it('tests getGeocentricEclipticSphericalJ2000Coordinates', async () => {
    const coords = await sun.getGeocentricEclipticSphericalJ2000Coordinates();

    expect(round(coords.lon, 8)).toBe(209.02487179);
    expect(round(coords.lat, 8)).toBe(0.00138647);
    expect(round(coords.radiusVector, 8)).toBe(0.99514386);
});

it('tests getGeocentricEclipticSphericalDateCoordinates', async () => {
    const coords = await sun.getGeocentricEclipticSphericalDateCoordinates();

    expect(round(coords.lon, 8)).toBe(209.31555315);
    expect(round(coords.lat, 8)).toBe(-0.00014017);
    expect(round(coords.radiusVector, 8)).toBe(0.99514386);
});

it('tests getGeocentricEquatorialSphericalJ2000Coordinates', async () => {
    const coords = await sun.getGeocentricEquatorialSphericalJ2000Coordinates();

    expect(round(coords.rightAscension, 8)).toBe(206.9810651);
    expect(round(coords.declination, 8)).toBe(-11.1254097);
    expect(round(coords.radiusVector, 8)).toBe(0.99514386);
});

it('tests getGeocentricEquatorialSphericalDateCoordinates', async () => {
    const coords = await sun.getGeocentricEquatorialSphericalDateCoordinates();

    expect(round(coords.rightAscension, 8)).toBe(207.25762788);
    expect(round(coords.declination, 8)).toBe(-11.22974218);
    expect(round(coords.radiusVector, 8)).toBe(0.99514386);
});

it('tests getApparentGeocentricEclipticRectangularCoordinates', async () => {
    const {x, y, z} = await sun.getApparentGeocentricEclipticRectangularCoordinates();

    expect(round(x, 8)).toBe(-0.86779362);
    expect(round(y, 8)).toBe(-0.48707858);
    expect(round(z, 8)).toBe(-0.00000243);
});

it('tests getApparentGeocentricEclipticSphericalCoordinates', async () => {
    const coords = await sun.getApparentGeocentricEclipticSphericalCoordinates();

    expect(round(coords.lon, 8)).toBe(209.30479579);
    expect(round(coords.lat, 8)).toBe(-0.00014017);
    expect(round(coords.radiusVector, 8)).toBe(0.99514386);
});

it('tests getApparentGeocentricEquatorialSphericalCoordinates', async () => {
    const coords = await sun.getApparentGeocentricEquatorialSphericalCoordinates();

    expect(round(coords.rightAscension, 8)).toBe(207.2473691);
    expect(round(coords.declination, 8)).toBe(-11.22593849);
    expect(round(coords.radiusVector, 8)).toBe(0.99514386);
});

it('tests getTopocentricEquatorialSphericalCoordinates', async () => {
    const {rightAscension, declination, radiusVector}
        = await sun.getTopocentricEquatorialSphericalCoordinates(location);

    expect(round(rightAscension, 6)).toBe(207.248793);
    expect(round(declination, 6)).toBe(-11.227945);
    expect(round(radiusVector, 6)).toBe(0.995141);
});

it('tests getTopocentricHorizontalCoordinates', async () => {
    const {azimuth, altitude, radiusVector} = await sun.getTopocentricHorizontalCoordinates(location);

    expect(round(azimuth, 6)).toBe(113.50076);
    expect(round(altitude, 6)).toBe(3.433893);
    expect(round(radiusVector, 6)).toBe(0.995141);
});

it('tests getApparentTopocentricHorizontalCoordinates', async () => {
    const {azimuth, altitude, radiusVector} = await sun.getApparentTopocentricHorizontalCoordinates(location);

    expect(round(azimuth, 6)).toBe(113.50076);
    expect(round(altitude, 6)).toBe(3.643379);
    expect(round(radiusVector, 6)).toBe(0.995141);
});

it('tests getDistanceToEarth', async () => {
    const d = await sun.getDistanceToEarth();

    expect(round(d, 6)).toBe(148871402.777339);
});

it('tests getApparentDistanceToEarth', async () => {
    const d = await sun.getApparentDistanceToEarth();

    expect(round(d, 6)).toBe(148871402.777339);
});

it('tests getTopocentricDistanceToEarth', async () => {
    const d = await sun.getTopocentricDistanceToEarth(location);

    expect(round(d, 6)).toBe(148871013.470828);
});

it('tests getTransit', async () => {
    const toi = await sun.getTransit(location);

    expect(toi.time).toEqual({year: 2020, month: 10, day: 22, hour: 10, min: 50, sec: 46});
});

it('tests getRise', async () => {
    const toi = await sun.getRise(location);

    expect(toi.time).toEqual({year: 2020, month: 10, day: 22, hour: 5, min: 46, sec: 44});
});

it('tests getRiseUpperLimb', async () => {
    const toi = await sun.getRiseUpperLimb(location);

    expect(toi.time).toEqual({year: 2020, month: 10, day: 22, hour: 5, min: 45, sec: 0});
});

it('tests getSet', async () => {
    const toi = await sun.getSet(location);

    expect(toi.time).toEqual({year: 2020, month: 10, day: 22, hour: 15, min: 53, sec: 59});
});

it('tests getSetUpperLimb', async () => {
    const toi = await sun.getSetUpperLimb(location);

    expect(toi.time).toEqual({year: 2020, month: 10, day: 22, hour: 15, min: 55, sec: 42});
});

it('tests getLightTime', async () => {
    const lt = await sun.getLightTime();

    expect(sec2string(lt)).toBe('0h 8m 16.58s');
});

it('tests getAngularDiameter', async () => {
    const delta = await sun.getAngularDiameter();

    expect(deg2angle(delta)).toBe('0° 32\' 09.582"');
});

it('tests getTopocentricAngularDiameter', async () => {
    const delta = await sun.getTopocentricAngularDiameter(location);

    expect(deg2angle(delta)).toBe('0° 32\' 09.587"');
});

it('tests getApparentMagnitude', async () => {
    const V = await sun.getApparentMagnitude();

    expect(V).toBe(-26.74);
});

it('tests getTopocentricApparentMagnitude', async () => {
    const V = await sun.getTopocentricApparentMagnitude();

    expect(V).toBe(-26.74);
});
