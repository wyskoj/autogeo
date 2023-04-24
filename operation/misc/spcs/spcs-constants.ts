import { SpcsZone } from './spcs-zones';
import { EllipsoidName } from '../ellipsoid/ellipsoid-types';
import { LCCParameters } from './spcs-definition';
import { eccentricity } from '../ellipsoid/ellipsoid-comp';
import { Ellipsoids } from '../ellipsoid/ellipsoid-defs';
import sign from '../../../utils/sign';

type LCCZoneConstants = {
	t0: number;
	t1: number;
	t2: number;
	w1: number;
	w2: number;
	m1: number;
	m2: number;
	sinPhi0: number;
	F: number;
	Rb: number;
};

type LCCPointParameters = {
	R: number;
	gamma: number;
	t: number;
	m?: number;
};

export function ComputeLCCZoneConstants(
	zone: SpcsZone,
	ellipsoid: EllipsoidName
): LCCZoneConstants {
	const p = LCCParameters[zone];
	const e = eccentricity(ellipsoid);
	const { a } = Ellipsoids[ellipsoid];

	const t0 = lccT(p.latitudeOrigin, e);
	const t1 = lccT(p.southParallel, e);
	const t2 = lccT(p.northParallel, e);

	const w1 = lccW(p.southParallel, e);
	const w2 = lccW(p.northParallel, e);

	const m1 = Math.cos(p.southParallel) / w1;
	const m2 = Math.cos(p.northParallel) / w2;

	const sinPhi0 = (Math.log(m1) - Math.log(m2)) / (Math.log(t1) - Math.log(t2));
	const F = m1 / (sinPhi0 * t1 ** sinPhi0);
	const Rb = a * F * t0 ** sinPhi0;

	return { t0, t1, t2, w1, w2, m1, m2, sinPhi0, F, Rb };
}

export function ComputeLCCPointParametersLatLon(
	zone: SpcsZone,
	ellipsoid: EllipsoidName,
	latitude: number,
	longitude: number
): LCCPointParameters {
	const p = LCCParameters[zone];
	const e = eccentricity(ellipsoid);
	const { a } = Ellipsoids[ellipsoid];
	const zc = ComputeLCCZoneConstants(zone, ellipsoid);

	const t = lccT(latitude, e);
	const R = a * zc.F * t ** zc.sinPhi0;
	const gamma = (longitude - p.longitudeOrigin) * zc.sinPhi0;
	const m =
		Math.cos(latitude) / Math.sqrt(1 - e ** 2 * Math.sin(latitude) ** 2);

	return { R, gamma, t, m };
}

export function ComputeLCCPointParametersNorthingEasting(
	zone: SpcsZone,
	ellipsoid: EllipsoidName,
	northing: number,
	easting: number
): LCCPointParameters {
	const p = LCCParameters[zone];
	const { a } = Ellipsoids[ellipsoid];
	const zc = ComputeLCCZoneConstants(zone, ellipsoid);

	const xprime = easting - p.falseEasting;
	const yprime = northing - p.falseNorthing;
	const R = sign(zc.sinPhi0) * Math.sqrt(xprime ** 2 + (zc.Rb - yprime) ** 2);
	const t = (R / (a * zc.F)) ** (1 / zc.sinPhi0);
	const gamma = Math.atan(xprime / (zc.Rb - yprime));

	return { R, gamma, t };
}

export function lccT(x: number, e: number) {
	return (
		Math.tan(Math.PI / 4 - x / 2) /
		((1 - e * Math.sin(x)) / (1 + e * Math.sin(x))) ** (e / 2)
	);
}

export function lccW(x: number, e: number) {
	return Math.sqrt(1 - e ** 2 * Math.sin(x) ** 2);
}
