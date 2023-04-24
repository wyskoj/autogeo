import { SpcsForwardsData } from './spcs-forwards-data';
import { SpcsForwardsResult } from './spcs-forwards-result';
import { SpcsZoneTypeDef } from '../../misc/spcs/spcs-zones';
import { LCCParameters, TMParameters } from '../../misc/spcs/spcs-definition';
import {
	eccentricity,
	secondEccentricity,
} from '../../misc/ellipsoid/ellipsoid-comp';
import { Ellipsoids } from '../../misc/ellipsoid/ellipsoid-defs';
import { ComputeLCCPointParametersLatLon, ComputeLCCZoneConstants } from '../../misc/spcs/spcs-constants';

export function SpcsForwardsComp(data: SpcsForwardsData): SpcsForwardsResult {
	if (SpcsZoneTypeDef[data.zone] === 'lcc') {
		return LambertConformalConicComp(data);
	} else {
		return TraverseMercatorComp(data);
	}
}

function LambertConformalConicComp(data: SpcsForwardsData): SpcsForwardsResult {
	const p = LCCParameters[data.zone];
	const { a } = Ellipsoids[data.ellipsoid];

	const zoneConstants = ComputeLCCZoneConstants(data.zone, data.ellipsoid);
	const pointParams = ComputeLCCPointParametersLatLon(
		data.zone,
		data.ellipsoid,
		data.latitude,
		data.longitude
	);

	const x = pointParams.R * Math.sin(pointParams.gamma) + p.falseEasting;
	const y = zoneConstants.Rb - pointParams.R * Math.cos(pointParams.gamma) + p.falseNorthing;
	const k = (pointParams.R * zoneConstants.sinPhi0) / (a * pointParams.m!!);

	return {
		northing: y,
		easting: x,
		scaleFactor: k,
		convergenceAngle: pointParams.gamma,
	};
}

function TraverseMercatorComp(data: SpcsForwardsData): SpcsForwardsResult {
	const p = TMParameters[data.zone];
	const e2 = eccentricity(data.ellipsoid) ** 2;
	const ePrime2 = secondEccentricity(data.ellipsoid) ** 2;
	const { a } = Ellipsoids[data.ellipsoid];

	const k0 = 1 - 1 / p.scaleFactor;
	const N = a / Math.sqrt(1 - e2 * Math.sin(data.latitude) ** 2);
	const T = Math.tan(data.latitude) ** 2;
	const C = ePrime2 * Math.cos(data.latitude) ** 2;
	const A = Math.cos(data.latitude) * (data.longitude - p.longitudeOrigin);
	const M =
		a *
		((1 - e2 / 4 - (3 * e2 ** 2) / 64 - (5 * e2 ** 3) / 256) * data.latitude -
			((3 * e2) / 8 + (3 * e2 ** 2) / 32 + (45 * e2 ** 3) / 1024) *
				Math.sin(2 * data.latitude) +
			((15 * e2 ** 2) / 256 + (45 * e2 ** 3) / 1024) *
				Math.sin(4 * data.latitude) -
			((35 * e2 ** 3) / 3072) * Math.sin(6 * data.latitude));
	const M0 =
		a *
		((1 - e2 / 4 - (3 * e2 ** 2) / 64 - (5 * e2 ** 3) / 256) *
			p.latitudeOrigin -
			((3 * e2) / 8 + (3 * e2 ** 2) / 32 + (45 * e2 ** 3) / 1024) *
				Math.sin(2 * p.latitudeOrigin) +
			((15 * e2 ** 2) / 256 + (45 * e2 ** 3) / 1024) *
				Math.sin(4 * p.latitudeOrigin) -
			((35 * e2 ** 3) / 3072) * Math.sin(6 * p.latitudeOrigin));

	const easting =
		k0 *
			N *
			(A +
				((1 - T + C) * A ** 3) / 6 +
				((5 - 18 * T + T ** 2 + 72 * C) * A ** 5) / 120) +
		p.falseEasting;

	const northing =
		k0 *
			(M -
				M0 +
				N *
					Math.tan(data.latitude) *
					(A ** 2 / 2 + ((5 - T + 9 * C + 4 * C ** 2) * A ** 4) / 24) +
				((61 - 58 * T + T ** 2 + 600 * C) * A ** 6) / 720) +
		p.falseNorthing;

	const scaleFactor =
		k0 *
		(1 +
			((1 + C) * A ** 2) / 2 +
			((5 - 4 * T + 42 * C + 13 * C ** 2 - 28 * ePrime2) * A ** 4) / 24 +
			((61 - 148 * T + 16 * T ** 2) * A ** 6) / 720);

	const C2 = (1 + 3 * C + 2 * C ** 2) / 3;
	const C3 = (2 - T) / 15;
	const convergenceAngle =
		A * Math.tan(data.latitude) * (1 + A) ** (2 * (C2 + C3 * A) ** 2);
	return {
		convergenceAngle,
		easting,
		northing,
		scaleFactor,
	};
}
