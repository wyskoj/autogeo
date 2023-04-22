import DMS from '../types/dms';
import { DMSToRadians, radiansToDMS } from './angle';

const zeroPad = (num: any, places: number) => {
	const strings = num.toString().split('.');
	return (
		strings[0].padStart(places, '0') + (strings[1] ? `.${strings[1]}` : '')
	);
};

export default function FormatDMS(dms: DMS, fixed: number): string {
	if (isNaN(dms.d ?? 0) || isNaN(dms.m ?? 0) || isNaN(dms.s ?? 0)) {
		return '----';
	}
	return `${dms.d ?? 0}° ${zeroPad(dms.m ?? 0, 2)}' ${zeroPad(
		(dms.s ?? 0).toFixed(fixed),
		2
	)}"`;
}

export function FormatLatLon(
	dms: DMS,
	fixed: number,
	direction: 'lat' | 'lon'
): string {
	if (isNaN(dms.d ?? 0) || isNaN(dms.m ?? 0) || isNaN(dms.s ?? 0)) {
		return '----';
	}
	const rad = DMSToRadians(dms.d ?? 0, dms.m ?? 0, dms.s ?? 0);

	// Latitude
	if (direction === 'lat') {
		const latDms = radiansToDMS(Math.abs(rad));
		return `${FormatDMS(latDms, fixed)} ${rad < 0 ? 'S' : 'N'}`;
	}

	// Longitude
	const lonDms = (() => {
		if (rad > Math.PI / 2) {
			return { angle: radiansToDMS(Math.PI * 2 - rad), symbol: 'W' };
		}
		if (rad < 0) {
			return { angle: radiansToDMS(Math.abs(rad)), symbol: 'W' };
		}
		return { angle: radiansToDMS(rad), symbol: 'E' };
	})();

	return `${FormatDMS(lonDms.angle, fixed)} ${lonDms.symbol}`;
}
