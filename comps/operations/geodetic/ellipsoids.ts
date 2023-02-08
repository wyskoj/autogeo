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
