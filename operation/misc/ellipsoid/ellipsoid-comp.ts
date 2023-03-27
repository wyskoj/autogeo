import { EllipsoidName } from './ellipsoid-types';
import { Ellipsoids } from './ellipsoid-defs';

/**
 * Given the name of an ellipsoid, returns its eccentricity (e).
 *
 * @param ellipsoid The name of the ellipsoid.
 * @returns The eccentricity of the ellipsoid.
 */
export function eccentricity(ellipsoid: EllipsoidName): number {
	return Math.sqrt(
		1 - (Ellipsoids[ellipsoid].b / Ellipsoids[ellipsoid].a) ** 2
	);
}