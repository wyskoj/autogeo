import DMS from '../types/dms';

const zeroPad = (num: any, places: number) =>
	num.toString().padStart(places, '0');

export default function FormatDMS(dms: DMS): string {
	return `${dms.d ?? 0}° ${zeroPad(dms.m ?? 0, 2)}' ${zeroPad(
		Math.round(dms.s ?? 0),
		2
	)}"`;
}
