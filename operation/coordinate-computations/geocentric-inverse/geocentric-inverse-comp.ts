import { GeocentricInverseResult } from './geocentric-inverse-result';
import { GeocentricInverseData } from './geocentric-inverse-data';
import { Ellipsoids } from '../../misc/ellipsoid/ellipsoid-defs';
import { eccentricity } from '../../misc/ellipsoid/ellipsoid-comp';

export default function GeocentricInverseComp(
	data: GeocentricInverseData
): GeocentricInverseResult {
	// Ellipsoid parameters
	const { a } = Ellipsoids[data.ellipsoid];

	// Ellipsoid eccentricity
	const e = eccentricity(data.ellipsoid);

	// Distance to pole
	const DP = Math.sqrt(data.x ** 2 + data.y ** 2);

	// Longitude
	const longitude = 2 * Math.atan((DP - data.x) / data.y);

	// Iterations of latitude
	let phiX = Math.atan(data.z / (DP * (1 - e ** 2)));

	// Iterations of radius
	let RNX;

	// Iteration count (to prevent deadlocking)
	let n = 0;

	while (true) {
		RNX = RN(a, e, phiX);
		let phiN = phiIter(data.z, e, RNX, phiX, DP);
		if (Math.abs(phiN - phiX) * 206264.8062 < 0.00001 || n++ > 10) {
			break;
		}
		phiX = phiN; // Update iteration
	}

	let height;
	if (Math.abs(phiX) < Math.PI / 4) {
		height = DP / Math.cos(phiX) - RNX;
	} else {
		height = data.z / Math.sin(phiX) - RNX * (1 - e ** 2);
	}

	return {
		latitude: phiX,
		longitude,
		height,
	};
}

function phiIter(z: number, e: number, RN: number, phi: number, DP: number) {
	return Math.atan((z + e ** 2 * RN * Math.sin(phi)) / DP);
}

function RN(a: number, e: number, phi: number): number {
	return a / Math.sqrt(1 - e ** 2 * Math.sin(phi) ** 2);
}
