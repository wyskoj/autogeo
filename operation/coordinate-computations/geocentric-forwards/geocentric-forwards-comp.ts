import { RadiiComp } from '../../geodetic-computations/radii/radii-comp';
import { eccentricity } from '../../misc/ellipsoid/ellipsoid-comp';
import { GeocentricForwardsData } from './geocentric-forwards-data';
import { GeocentricForwardsResult } from './geocentric-forwards-result';

export default function GeocentricForwardsComp(data: GeocentricForwardsData): GeocentricForwardsResult {
	const { ellipsoid, latitude, longitude, height } = data;
	const radii = RadiiComp({
		ellipsoid: ellipsoid,
		azimuth: 0,
		latitude: latitude,
	});

	const calcPartial = (angle: number) => (radii.radiusPrimeVertical + height) * Math.cos(latitude) * angle;
	const X = calcPartial(Math.cos(longitude));
	const Y = calcPartial(Math.sin(longitude));
	const Z = ((1 - eccentricity(ellipsoid) ** 2) * radii.radiusPrimeVertical + height) * Math.sin(latitude);

	return { X, Y, Z };
}