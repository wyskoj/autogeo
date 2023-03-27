import { RadiiData } from './radii-data';
import { RadiiResult } from './radii-result';
import { Ellipsoids } from '../../misc/ellipsoid/ellipsoid-defs';
import { eccentricity } from '../../misc/ellipsoid/ellipsoid-comp';

export function RadiiComp(data: RadiiData): RadiiResult {
	const a = Ellipsoids[data.ellipsoid].a;
	const e = eccentricity(data.ellipsoid);

	const rn = a / Math.sqrt(1 - e ** 2 * Math.sin(data.latitude) ** 2);
	const rm =
		(a * (1 - e ** 2)) / (1 - e ** 2 * Math.sin(data.latitude) ** 2) ** 1.5;
	const ra =
		1 / (Math.cos(data.azimuth) ** 2 / rm + Math.sin(data.azimuth) ** 2 / rn);
	return {
		radiusPrimeVertical: rn,
		radiusMeridian: rm,
		radiusAzimuth: ra,
	};
}
