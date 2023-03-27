import { Ellipsoid, EllipsoidName } from './ellipsoid-types';

/**
 * A list of the most common ellipsoids.
 */
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
