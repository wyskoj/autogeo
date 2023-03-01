import {
	Ellipsoid,
	EllipsoidName,
} from '../../../types/operation/geodetic/ellipsoid';

export const Ellipsoids: { [name in EllipsoidName]: Ellipsoid } = {
	GRS80: {
		a: 6378137.0,
		b: 6356752.31414035,
	},
	WGS84: {
		a: 6378137.0,
		b: 6356752.31424518,
	},
};

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
