import { PointToLineData } from './point-to-line-data';
import { PointToLineResult } from './point-to-line-result';
import { InverseAzimuth } from '../../misc/inverse-azimuth';

export function PointToLineComp(
	data: PointToLineData
): PointToLineResult {
	const lineSlope = (data.station2.y - data.station1.y) / (data.station2.x - data.station1.x);
	const lineYIntercept = data.station1.y - (lineSlope * data.station1.x);
	const distanceAP = Math.sqrt(
		(data.point.x - data.station1.x) ** 2 +
		(data.point.y - data.station1.y) ** 2
	);
	const azimuthAP = InverseAzimuth(data.station1, data.point);
	const azimuthAB = InverseAzimuth(data.station1, data.station2);
	const alpha = azimuthAP - azimuthAB;
	const distance = Math.abs(distanceAP * Math.sin(alpha));
	return {
		distance,
		azimuth: (alpha > 0 ? (azimuthAB + ((3 / 2) * Math.PI)) % (Math.PI * 2) : (azimuthAB + (Math.PI / 2)) % (Math.PI * 2))
	};
}