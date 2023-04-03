import { AngleAngleIntersectionData } from './angle-angle-intersection-data';
import { AngleAngleIntersectionResult } from './angle-angle-intersection-result';
import { InverseAzimuth } from '../../misc/inverse-azimuth';

export function AngleAngleIntersectionComp(
	data: AngleAngleIntersectionData
): AngleAngleIntersectionResult {
	// This is basically a Bearing-Bearing intersection, just with an extra step.
	const AzOB1 = InverseAzimuth(data.occupiedStation1, data.backsightStation1);
	const AzOI1 = AzOB1 + data.angleFromStation1;

	const AzOB2 = InverseAzimuth(data.occupiedStation2, data.backsightStation2);
	const AzOI2 = AzOB2 + data.angleFromStation2;

	const AB = Math.sqrt(
		(data.occupiedStation1.x - data.occupiedStation2.x) ** 2 +
			(data.occupiedStation1.y - data.occupiedStation2.y) ** 2
	);

	const AzAB = InverseAzimuth(data.occupiedStation1, data.occupiedStation2);

	const A = AzOI1 - AzAB;
	const B = Math.PI + AzAB - AzOI2;
	const P = Math.PI - A - B;

	const AP = AB * (Math.sin(B) / Math.sin(P));

	const x = data.occupiedStation1.x + AP * Math.sin(AzOI1);
	const y = data.occupiedStation1.y + AP * Math.cos(AzOI1);

	if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
		throw Error('There is no solution for the given data.');
	}

	return {
		solution: {
			x,
			y,
			station: 'P',
		},
	};
}
