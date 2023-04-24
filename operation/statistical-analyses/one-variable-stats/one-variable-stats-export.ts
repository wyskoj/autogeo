import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { OneVariableStatsData } from './one-variable-stats-data';
import { OneVariableStatsResult } from './one-variable-stats-result';

export function OneVariableStatsExport(
	instance: OperationInstance,
	format: ExportFormat
): string {
	const data = instance.data as OneVariableStatsData;
	const result = instance.result as OneVariableStatsResult;

	switch (format) {
		case 'plain':
			return `${instance.name} — One Variable Statistics

=== Data ===

== Values ==
${data.values.join(', ')}

=== Results ===

== Mean ==
${result.mean}

== Median ==
${result.median}

== Mode ==
${result.mode}

== Standard deviation ==
${isNaN(result.standardDeviation) ? '----' : result.standardDeviation}

== Standard deviation of the mean ==
${isNaN(result.standardDeviationOfMean) ? '----' : result.standardDeviationOfMean}

== Variance ==
${isNaN(result.variance) ? '----' : result.variance}

== Residuals ==
${result.residuals.join(', ')}
`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}