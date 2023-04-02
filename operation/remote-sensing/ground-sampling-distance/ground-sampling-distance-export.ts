import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { GroundSamplingDistanceData } from './ground-sampling-distance-data';
import { GroundSamplingDistanceResult } from './ground-sampling-distance-result';

export default function GroundSamplingDistanceExport(
	instance: OperationInstance,
	format: ExportFormat
): string {
	const data = instance.data as GroundSamplingDistanceData;
	const result = instance.result as GroundSamplingDistanceResult;
	switch (format) {
		case 'plain':
			return `${instance.name} — Ground Sampling Distance

=== Data ===

== Scanning resolution ==
${data.scanningResolution} DPI

== Scale denominator ==
${data.scaleDenominator}

=== Results ===

== Ground sampling distance ==
${result.groundSamplingDistance}
`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}