import { StationCoordinates } from './station-coordinates';

/**
 * Calculates the azimuth from one point to another.
 * It is an implementation of Ghilani's formula from Elementary Surveying
 * (11.5a).
 *
 * @param point1 The StationCoordinates of the first point.
 * @param point2 The StationCoordinates of the second point.
 * @returns The azimuth from point1 to point2.
 */
export function InverseAzimuth(point1: StationCoordinates, point2: StationCoordinates): number {

	// Calculate the differences in the x and y coordinates of the two points
	const dX = point2.x - point1.x;
	const dY = point2.y - point1.y;

	// Handle the case when dY equals 0 to avoid division by zero
	if (dY === 0) {
		return dX > 0 ? Math.PI / 2 : 3 * Math.PI / 2;
	}

	// Initialize constant C based on the quadrant the angle lies in.
	// If dX > 0 and dY > 0, C is 0, indicating the first quadrant.
	// If dY < 0, regardless of dX, C is Math.PI, indicating the second or third quadrant.
	// Otherwise, C is 2 * Math.PI, indicating the fourth quadrant.
	const C = dX > 0 && dY > 0 ? 0 : dY < 0 ? Math.PI : 2 * Math.PI;

	// Calculate the inverse azimuth, adjusting for quadrant by adding C to atan(dX / dY)
	// Ensure the final result is between 0 and 2 * Math.PI by taking the result modulo 2 * Math.PI
	return (C + Math.atan(dX / dY)) % (2 * Math.PI);
}
