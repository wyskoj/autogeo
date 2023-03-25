import DMS from '../types/dms';

/**
 * Convert degrees, minutes, seconds to radians.
 * @param d Degrees
 * @param m Minutes
 * @param s Seconds
 * @returns The angle in radians.
 */
export function DMSToRadians(d: number, m: number, s: number): number {
	return (d + m / 60 + s / 3600) * (Math.PI / 180);
}

/**
 * Convert degrees, minutes, seconds to radians, using a DMS object.
 * @param DMS The angle in degrees, minutes, seconds.
 * @returns The angle in radians.
 */
export function DMSToRadiansT(DMS: DMS): number {
	return (
		((DMS.d ?? 0) + (DMS.m ?? 0) / 60 + (DMS.s ?? 0) / 3600) * (Math.PI / 180)
	);
}

/**
 * Convert decimal degrees to degrees, minutes, seconds.
 *
 * @param dd The angle in decimal degrees.
 * @returns The angle in degrees, minutes, seconds.
 */
export function decimalToDMS(dd: number): {
	d: number;
	m: number;
	s: number;
} {
	const d = Math.floor(dd);
	const m = Math.floor((dd - d) * 60);
	const s = Math.floor(((dd - d) * 60 - m) * 60);
	return { d, m, s };
}

export function DMStoDecimal(dms: DMS): number {
	return (dms.d ?? 0) + (dms.m ?? 0) / 60 + (dms.s ?? 0) / 3600;
}

export function radiansToDMS(rad: number): DMS {
	const dd = rad * (180 / Math.PI);
	const d = Math.floor(dd);
	const m = Math.floor((dd - d) * 60);
	const s = Math.floor(((dd - d) * 60 - m) * 60);
	return { d, m, s };
}

export function decimalToRadians(dd: number): number {
	return dd * (Math.PI / 180);
}
