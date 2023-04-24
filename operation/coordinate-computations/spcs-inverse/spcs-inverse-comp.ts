import { SpcsInverseData } from './spcs-inverse-data';
import { SpcsInverseResult } from './spcs-inverse-result';
import { LCCParameters, TMParameters } from '../../misc/spcs/spcs-definition';
import { Ellipsoids } from '../../misc/ellipsoid/ellipsoid-defs';
import {
	ComputeLCCPointParametersNorthingEasting,
	ComputeLCCZoneConstants,
} from '../../misc/spcs/spcs-constants';
import { eccentricity } from '../../misc/ellipsoid/ellipsoid-comp';
import { SpcsZoneTypeDef } from '../../misc/spcs/spcs-zones';

/** 5 microarcseconds (0.000005") in radians. */
const FIVE_MICROARCSECONDS = 2.424E-11;

export function SpcsInverseComp(data: SpcsInverseData): SpcsInverseResult {
	if (SpcsZoneTypeDef[data.zone] === 'lcc') {
		return inverseLambert(data);
	} else {
		return inverseMercator(data);
	}
}

function inverseMercator(data: SpcsInverseData): SpcsInverseResult {
	const e = eccentricity(data.ellipsoid);
	const { a } = Ellipsoids[data.ellipsoid];
	const p = TMParameters[data.zone];
	const sf = 1 - 1 / p.scaleFactor;

	const xPrime = data.easting - p.falseEasting;
	const yPrime = data.northing - p.falseNorthing;
	const e2 = e ** 2;
	const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));
	const M0 =
		a *
		((1 - e2 / 4 - (3 * e2 ** 2) / 64 - (5 * e2 ** 3) / 256) *
			p.latitudeOrigin -
			((3 * e2) / 8 + (3 * e2 ** 2) / 32 + (45 * e2 ** 3) / 1024) *
				Math.sin(2 * p.latitudeOrigin) +
			((15 * e2 ** 2) / 256 + (45 * e2 ** 3) / 1024) *
				Math.sin(4 * p.latitudeOrigin) -
			((35 * e2 ** 3) / 3072) * Math.sin(6 * p.latitudeOrigin));
	const M = M0 + yPrime / sf;
	const mu = M / (a * (1 - e2 / 4 - (3 * e2 ** 2) / 64 - (5 * e2 ** 3) / 256));
	const phi1 =
		mu +
		((3 * e1) / 2 - (27 * e1 ** 3) / 32) * Math.sin(2 * mu) +
		((21 * e1 ** 2) / 16 - (55 * e1 ** 4) / 32) * Math.sin(4 * mu) +
		((151 * e1 ** 3) / 96) * Math.sin(6 * mu) +
		((1097 * e1 ** 4) / 512) * Math.sin(8 * mu);
	const ePrime2 = e2 / (1 - e2);
	const C1 = ePrime2 * Math.cos(phi1) ** 2;
	const T1 = Math.tan(phi1) ** 2;
	const N1 = a / Math.sqrt(1 - e2 * Math.sin(phi1) ** 2);
	const R1 = (a * (1 - e2)) / (1 - e2 * Math.sin(phi1) ** 2) ** 1.5;
	const D = xPrime / (N1 * sf);

	const latitude =
		phi1 -
		((N1 * Math.tan(phi1)) / R1) *
			(D ** 2 / 2 -
				((5 + 3 * T1 + 10 * C1 - 4 * C1 ** 2 - 9 * Math.sqrt(ePrime2)) *
					D ** 4) /
					24 +
				((61 + 90 * T1 + 298 * C1 + 45 * T1 ** 2 - 3 * C1 ** 2) * D ** 6) /
					720);

	const longitude =
		p.longitudeOrigin +
		(D -
			((1 + 2 * T1 + C1) * D ** 3) / 6 +
			((5 - 2 * C1 + 28 * T1 - 3 * C1 ** 2 + 24 * T1 ** 2) * D ** 5) /
				120) /
			Math.cos(phi1);

	const footC = ePrime2 * Math.cos(latitude) ** 2;
	const T = Math.tan(latitude) ** 2;
	const A = Math.cos(latitude) * (longitude - p.longitudeOrigin);
	const scaleFactor =
		sf *
		(1 +
			((1 + footC) * A ** 2) / 2 +
			((5 - 4 * T + 42 * footC + 13 * footC ** 2 - 28 * ePrime2) * A ** 4) /
				24 +
			((61 - 148 * T + 16 * T ** 2) * A ** 6) / 720);
	const convA = (longitude - p.longitudeOrigin) * Math.cos(latitude);

	const C = ePrime2 * Math.cos(latitude) ** 2;
	const C2 = (1 + 3 * C + 2 * C ** 2) / 3;
	const C3 = (2 - Math.tan(latitude)) ** 2 / 15;

	const gamma =
		convA * Math.tan(latitude) * (1 + convA ** 2 * (C2 + C3 * convA ** 2));

	return {
		convergenceAngle: gamma,
		latitude,
		longitude,
		scaleFactor,
	};
}

function inverseLambert(data: SpcsInverseData): SpcsInverseResult {
	const e = eccentricity(data.ellipsoid);
	const { a } = Ellipsoids[data.ellipsoid];
	const p = LCCParameters[data.zone];

	const zoneConstants = ComputeLCCZoneConstants(data.zone, data.ellipsoid);
	const pointParams = ComputeLCCPointParametersNorthingEasting(
		data.zone,
		data.ellipsoid,
		data.northing,
		data.easting
	);

	let latitude = Math.PI / 2 - 2 * Math.atan(pointParams.t);
	let iters = 0;

	while (iters++ < 100) { // Prevent deadlocking
		let iteration =
			Math.PI / 2 -
			2 *
				Math.atan(
					pointParams.t *
						((1 - e * Math.sin(latitude)) / (1 + e * Math.sin(latitude))) **
							(e / 2)
				);
		if (Math.abs(latitude - iteration) <= FIVE_MICROARCSECONDS) {
			latitude = iteration;
			break;
		}
		latitude = iteration;
	}

	const longitude =
		pointParams.gamma / zoneConstants.sinPhi0 + p.longitudeOrigin;
	const m =
		Math.cos(latitude) / Math.sqrt(1 - e ** 2 * Math.sin(latitude) ** 2);
	const scaleFactor = (pointParams.R * zoneConstants.sinPhi0) / (a * m);

	return {
		convergenceAngle: pointParams.gamma,
		latitude,
		longitude,
		scaleFactor,
	};
}
