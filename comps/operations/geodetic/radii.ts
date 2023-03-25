import {
	RadiiData,
	RadiiResults,
} from '../../../types/operation/geodetic/radii';
import { eccentricity, Ellipsoids } from './ellipsoids';

/**
 * Calculates the radii of curvature for a given ellipsoid, latitude, and azimuth.
 *
 * @param data The data object (angles in radians).
 * @returns The results object.
 */
export function Radii(data: RadiiData): RadiiResults {
	const a = Ellipsoids[data.ellipsoid].a;
	const e = eccentricity(data.ellipsoid);

	const rn = a / Math.sqrt(1 - e ** 2 * Math.sin(data.latitude) ** 2);
	const rm =
		(a * (1 - e ** 2)) / (1 - e ** 2 * Math.sin(data.latitude) ** 2) ** 1.5;
	const ra =
		1 / (Math.cos(data.azimuth) ** 2 / rm + Math.sin(data.azimuth) ** 2 / rn);
	return {
		radiusPrimeVertical: rn,
		radiusMeridian: rm,
		radiusAzimuth: ra,
	};
}
