import { ExportFormat } from '../../types/export-format';
import { OperationInstance } from '../../types/operation-instance';
import {
	DifferentialLevelingData,
	DifferentialLevelingResults,
} from '../../types/operation/least-squares/differential-leveling';
import capitalize from '../../utils/capitalize';

export default function DifferentialLevelingExport(
	instance: OperationInstance,
	format: ExportFormat
): string {
	console.log('Exporting differential leveling');
	const data = instance.data as DifferentialLevelingData;
	const result = instance.result as DifferentialLevelingResults;
	switch (format) {
		case 'plain':
			return `${instance.name} — Differential Leveling

=== Data ===

== Weighting scheme ==
${capitalize(data.weightingScheme)}

== Benchmarks ==
Station\t\tElevation
${data.benchmarks.map(b => `${b.station}\t\t${b.elevation}`).join('\n')}

== Observations ==
From\t\tTo\t\tΔ Elevation\t\tWeight
${data.observations
	.map(
		o =>
			`${o.from}\t\t${o.to}\t\t${o.deltaElevation}${
				data.weightingScheme === 'unweighted' ? '' : `\t\t${o.weight}`
			}`
	)
	.join('\n')}
	
=== Results ===

== Adjusted elevations ==
Station\t\tElevation
${result.adjustedStations.map(b => `${b.station}\t\t${b.elevation}`).join('\n')}

== Residuals ==
From\t\tTo\t\tResidual
${result.residuals.map(o => `${o.from}\t\t${o.to}\t\t${o.residual}`).join('\n')}

== Reference standard deviation ==
${result.referenceStdDev}
`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}
