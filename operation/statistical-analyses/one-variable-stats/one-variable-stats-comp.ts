import { OneVariableStatsResult } from './one-variable-stats-result';
import { OneVariableStatsData } from './one-variable-stats-data';

export function OneVariableStatsComp(
	data: OneVariableStatsData
): OneVariableStatsResult {
	const mean = data.values.reduce((a, b) => a + b, 0) / data.values.length;
	const sorted = [...data.values].sort((a, b) => a - b);
	const median =
		sorted.length % 2 === 0
			? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
			: sorted[Math.floor(sorted.length / 2)];
	const mode = data.values
		.map(v => ({ value: v, count: data.values.filter(v2 => v2 === v).length }))
		.reduce((a, b) => (a.count > b.count ? a : b)).value;
	const residuals = data.values.map(v => mean - v);
	const variance =
		residuals.map(v => v ** 2).reduce((a, b) => a + b, 0) / (data.values.length -1);
	const standardDeviation = Math.sqrt(variance);
	const standardDeviationOfMean =
		standardDeviation / Math.sqrt(data.values.length);

	return {
		mean,
		median,
		mode,
		residuals,
		standardDeviation,
		standardDeviationOfMean,
		variance,
	};
}