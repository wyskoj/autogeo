import {
	GeocentricForwardData,
	GeocentricForwardResult,
} from '../../../types/operation/coordinate-computations/geocentric-cartesian-coordinate';
import { Radii } from '../geodetic/radii';
import { eccentricity } from '../geodetic/ellipsoids';

/**
 * Computes geocentric cartesian coordinates from geodetic coordinates.
 *
 * @param data The geodetic coordinates.
 * @returns The geocentric cartesian coordinates.
 */
export default function GeocentricForward(
	data: GeocentricForwardData
): GeocentricForwardResult {
	const radii = Radii({
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
