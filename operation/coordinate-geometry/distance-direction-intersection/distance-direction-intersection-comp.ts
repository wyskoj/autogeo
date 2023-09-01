import { DistanceDirectionIntersectionData } from './distance-direction-intersection-data';
import { DistanceDirectionIntersectionResult } from './distance-direction-intersection-result';
import { InverseAzimuth } from '../../misc/inverse-azimuth';
import { StationCoordinates } from '../../misc/station-coordinates';

export function DistanceDirectionIntersectionComp(
	data: DistanceDirectionIntersectionData
): DistanceDirectionIntersectionResult {
	const distanceAB = Math.sqrt(
		(data.point1.x - data.point2.x) ** 2
		+ (data.point1.y - data.point2.y) ** 2
	);
	const azimuthAB = InverseAzimuth(data.point1, data.point2);
	const A = data.azimuth - azimuthAB;

	const AP1 = ((2 * distanceAB * Math.cos(A)) + Math.sqrt((
		2 * distanceAB * Math.cos(A)
	) ** 2 - 4 * (distanceAB ** 2 - data.distance ** 2))) / 2;

	const AP2 = ((2 * distanceAB * Math.cos(A)) - Math.sqrt((
		2 * distanceAB * Math.cos(A)
	) ** 2 - 4 * (distanceAB ** 2 - data.distance ** 2))) / 2;

	const solution1 = {
		x: data.point1.x + AP1 * Math.sin(data.azimuth),
		y: data.point1.y + AP1 * Math.cos(data.azimuth),
		station: 'P1'
	} satisfies StationCoordinates;

	const solution2 = {
		x: data.point1.x + AP2 * Math.sin(data.azimuth),
		y: data.point1.y + AP2 * Math.cos(data.azimuth),
		station: 'P2'
	} satisfies StationCoordinates;

	return {
		solution1,
		solution2
	};
}