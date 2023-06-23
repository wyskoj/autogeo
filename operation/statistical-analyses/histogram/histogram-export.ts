import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { HistogramResult } from './histogram-result';
import { HistogramData } from './histogram-data';

export default function HistogramExport(
	instance: OperationInstance,
	format: ExportFormat
): string {
	const data = instance.data as HistogramData;
	const result = instance.result as HistogramResult;

	switch (format) {
		case 'plain':
			return `${instance.name} — Histogram
			
=== Data ===

${data.values.join('\n')}

=== Results ===

${result.binValues.map((binInfo, index) => `${binInfo.range.min} - ${binInfo.range.max}: ${binInfo.value}`).join('\n')}`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}