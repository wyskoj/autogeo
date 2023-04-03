import { DirectionDirectionIntersectionData } from './direction-direction-intersection-data';
import { DirectionDirectionIntersectionResult } from './direction-direction-intersection-result';
import { InverseAzimuth } from '../../misc/inverse-azimuth';

export function DirectionDirectionIntersectionComp(
	data: DirectionDirectionIntersectionData
): DirectionDirectionIntersectionResult {
	if (
		Math.abs((data.azimuth1 % Math.PI) - (data.azimuth2 % Math.PI)) <
		0.000000484
	) {
		// If tighter than 0.1" (0.000000484 radians), let's call it parallel.
		throw Error('The azimuths are parallel, there is no solution.');
	}

	const AB = Math.sqrt(
		(data.station1.x - data.station2.x) ** 2 +
			(data.station1.y - data.station2.y) ** 2
	);

	const AzAB = InverseAzimuth(data.station1, data.station2);

	const A = data.azimuth1 - AzAB;
	const B = Math.PI + AzAB - data.azimuth2;
	const P = Math.PI - A - B;

	const AP = AB * (Math.sin(B) / Math.sin(P));

	const x = data.station1.x + AP * Math.sin(data.azimuth1);
	const y = data.station1.y + AP * Math.cos(data.azimuth1);

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
