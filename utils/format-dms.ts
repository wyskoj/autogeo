const zeroPad = (num: any, places: number) =>
	num.toString().padStart(places, '0');

export default function DMS(dd: number): string {
	const d = Math.floor(dd);
	const m = Math.floor((dd - d) * 60);
	const s = ((dd - d) * 60 - m) * 60;
	return `${d}° ${zeroPad(m, 2)}' ${zeroPad(Math.round(s), 2)}"`;
}
