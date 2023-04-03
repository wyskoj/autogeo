import { DistanceDistanceIntersectionData } from './distance-distance-intersection-data';
import { DistanceDistanceIntersectionResult } from './distance-distance-intersection-result';
import { StationCoordinates } from '../../misc/station-coordinates';
import { InverseAzimuth } from '../../misc/inverse-azimuth';

export function DistanceDistanceIntersectionComp(
	data: DistanceDistanceIntersectionData
): DistanceDistanceIntersectionResult {
	// Distance between stations
	const AB = Math.sqrt(
		(data.station2.x - data.station1.x) ** 2 +
			(data.station2.y - data.station1.y) ** 2
	);

	// Azimuth from station 1 to station 2
	const AzAB = InverseAzimuth(data.station1, data.station2);

	// Angle P2_A_P1
	const A = Math.acos(
		(AB ** 2 + data.distance1 ** 2 - data.distance2 ** 2) /
			(2 * AB * data.distance1)
	);

	// Two solutions for azimuth to intersection point
	const AzAP1 = AzAB + A;
	const AzAP2 = AzAB - A;

	// Compute first solution
	const solution1: StationCoordinates = {
		station: 'P1',
		x: data.station1.x + data.distance1 * Math.sin(AzAP1),
		y: data.station1.y + data.distance1 * Math.cos(AzAP1),
	};

	// Compute second solution
	const solution2: StationCoordinates = {
		station: 'P2',
		x: data.station1.x + data.distance1 * Math.sin(AzAP2),
		y: data.station1.y + data.distance1 * Math.cos(AzAP2),
	};

	return {
		solution1,
		solution2,
	};
}
