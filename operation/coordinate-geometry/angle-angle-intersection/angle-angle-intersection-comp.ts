import { AngleAngleIntersectionData } from './angle-angle-intersection-data';
import { AngleAngleIntersectionResult } from './angle-angle-intersection-result';
import { InverseAzimuth } from '../../misc/inverse-azimuth';

export function AngleAngleIntersectionComp(
	data: AngleAngleIntersectionData
): AngleAngleIntersectionResult {

	// Compute the azimuths for the first station
	const AzOB1 = InverseAzimuth(data.occupiedStation1, data.backsightStation1); // Compute the azimuth between the occupied station and the backsight station
	const AzOI1 = AzOB1 + data.angleFromStation1; // Determine the azimuth of the intersection from the first station

	// Compute the azimuths for the second station
	const AzOB2 = InverseAzimuth(data.occupiedStation2, data.backsightStation2); // Compute the azimuth between the occupied station and the backsight station
	const AzOI2 = AzOB2 + data.angleFromStation2; // Determine the azimuth of the intersection from the second station

	// Compute the distance between the two occupied stations
	const AB = Math.sqrt(
		(data.occupiedStation1.x - data.occupiedStation2.x) ** 2 +
		(data.occupiedStation1.y - data.occupiedStation2.y) ** 2
	);

	// Compute the azimuth between the two occupied stations
	const AzAB = InverseAzimuth(data.occupiedStation1, data.occupiedStation2);

	// Calculate the angles for determining the intersection points
	const A = AzOI1 - AzAB; // Angle to the intersection from the first station
	const B = Math.PI + AzAB - AzOI2; // Angle to the intersection from the second station
	const P = Math.PI - A - B; // The known internal angle of the triangle

	const AP = AB * (Math.sin(B) / Math.sin(P)); // Length from first station to intersection point

	// Calculate the intersection point
	const x = data.occupiedStation1.x + AP * Math.sin(AzOI1);
	const y = data.occupiedStation1.y + AP * Math.cos(AzOI1);

	// Check if intersection point is real
	if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
		throw Error('There is no solution for the given data.');
	}

	// Return the intersection point as a solution
	return {
		solution: {
			x,
			y,
			station: 'P',
		},
	};
}