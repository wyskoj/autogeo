import { DirectionDirectionIntersectionData } from './direction-direction-intersection-data';
import { DirectionDirectionIntersectionResult } from './direction-direction-intersection-result';
import { InverseAzimuth } from '../../misc/inverse-azimuth';

export function DirectionDirectionIntersectionComp(
	data: DirectionDirectionIntersectionData
): DirectionDirectionIntersectionResult {
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

	return {
		solution: {
			x,
			y,
			station: 'P',
		},
	};
}
