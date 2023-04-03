import { StationCoordinates } from './station-coordinates';

/**
 * An implementation of Ghilani's (11.5a) formula from Elementary Surveying.
 * @param point1 The coordinates of the first point.
 * @param point2 The coordinates of the second point.
 * @returns The azimuth from point1 to point2.
 */
export function InverseAzimuth(
	point1: StationCoordinates,
	point2: StationCoordinates
): number {
	const dX = point2.x - point1.x;
	const dY = point2.y - point1.y;

	let C;
	if (dX > 0 && dY > 0) {
		C = 0;
	} else if (dY < 0) {
		C = Math.PI;
	} else {
		C = 2 * Math.PI;
	}

	return C + Math.atan(dX / dY);
}
