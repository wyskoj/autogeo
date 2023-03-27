import { RadiiComp } from '../../geodetic-computations/radii/radii-comp';
import { eccentricity } from '../../misc/ellipsoid/ellipsoid-comp';
import { GeocentricForwardsData } from './geocentric-forwards-data';
import { GeocentricForwardsResult } from './geocentric-forwards-result';

export default function GeocentricForwardsComp(
	data: GeocentricForwardsData
): GeocentricForwardsResult {
	const radii = RadiiComp({
		ellipsoid: data.ellipsoid,
		azimuth: 0,
		latitude: data.latitude,
	});
	const X =
		(radii.radiusPrimeVertical + data.height) *
		Math.cos(data.latitude) *
		Math.cos(data.longitude);
	const Y =
		(radii.radiusPrimeVertical + data.height) *
		Math.cos(data.latitude) *
		Math.sin(data.longitude);
	const Z =
		((1 - eccentricity(data.ellipsoid) ** 2) * radii.radiusPrimeVertical +
			data.height) *
		Math.sin(data.latitude);
	return { X, Y, Z };
}