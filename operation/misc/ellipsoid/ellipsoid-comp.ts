import { EllipsoidName } from './ellipsoid-types';
import { Ellipsoids } from './ellipsoid-defs';

/**
 * Given the name of an ellipsoid, returns its eccentricity (e).
 *
 * @param ellipsoid The name of the ellipsoid.
 * @returns The eccentricity of the ellipsoid.
 */
export function eccentricity(ellipsoid: EllipsoidName): number {
	const { a, b } = Ellipsoids[ellipsoid];
	return Math.sqrt(1 - (b / a) ** 2);
}

/**
 * Given the name of an ellipsoid, returns its second eccentricity (e').
 *
 * @param ellipsoid The name of the ellipsoid.
 * @returns The second eccentricity of the ellipsoid.
 */
export function secondEccentricity(ellipsoid: EllipsoidName): number {
	const chosenEllipsoid = Ellipsoids[ellipsoid];
	return Math.sqrt(chosenEllipsoid.a ** 2 / chosenEllipsoid.b ** 2 - 1);
}
