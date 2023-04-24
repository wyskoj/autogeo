/**
 * Returns the sign of a number. If the number is positive, 1 is returned. If the number is negative, -1 is returned. If the number is 0, 0 is returned.
 * @param x
 */
export default function sign(x: number): number {
	return x === 0 ? 0 : x > 0 ? 1 : -1;
}
