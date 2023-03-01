/**
 * Convert degrees, minutes, seconds to radians.
 * @param d Degrees
 * @param m Minutes
 * @param s Seconds
 * @returns The angle in radians.
 */
export function dmsToRad(d: number, m: number, s: number): number {
	return (d + m / 60 + s / 3600) * (Math.PI / 180);
}
