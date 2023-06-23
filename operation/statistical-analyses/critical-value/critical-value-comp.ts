import { CriticalValueData } from './critical-value-data';
import { CriticalValueResult } from './critical-value-result';

/**
 * Approximates the critical value for the normal distribution.
 */
function tValue(z: number): number {
	return Math.SQRT2 * invErf(z) * fudgeFactor(z);
}

/**
 * While Winzitski's approximation is very good, it is not perfect. This function
 * is a fudge factor to make it more accurate.
 *
 * @param z The value to approximate the fudge factor for.
 * @returns The fudge factor.
 */
function fudgeFactor(z: number): number {
	return 2.068E-7 * 12426.9 ** z + 1;
}

/**
 * A wonderful approximation of the inverse error function. Thanks to Sergei
 * Winitzki for this one (A handy approximation for the error function and its
 * inverse, 2008).
 * @param x The value to approximate the inverse error function for.
 * @returns The approximate inverse error function.
 */
function invErf(x: number): number {
	return (
		Math.sqrt(
			-12 +
				3 * Math.PI -
				2 * (-3 + Math.PI) * Math.log(1 - x ** 2) +
				Math.sqrt(
					9 * (-4 + Math.PI) ** 2 +
						6 *
							(-24 + 26 * Math.PI - 9 * Math.PI ** 2 + Math.PI ** 3) *
							Math.log(1 - x ** 2) +
						4 * (-3 + Math.PI) ** 2 * Math.log(1 - x ** 2) ** 2
				)
		) /
		(2 * Math.sqrt(-3 + Math.PI))
	);
}

export function CriticalValueComp(
	data: CriticalValueData
): CriticalValueResult {
	switch (data.type) {
		case 'normal':
			return {
				value: tValue(data.probability),
			};
		case 'chi-squared':
			return {
				value: 7.815,
			};
		case 't':
			return {
				value: 1.96,
			};
		case 'F':
			return {
				value: 1.96,
			};
	}
}
