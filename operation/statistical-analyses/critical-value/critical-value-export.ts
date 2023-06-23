import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { CriticalValueData } from './critical-value-data';
import { CriticalValueResult } from './critical-value-result';
import capitalize from '../../../utils/capitalize';

export default function CriticalValueExport(
	instance: OperationInstance,
	format: ExportFormat
): string {
	const data = instance.data as CriticalValueData;
	const result = instance.result as CriticalValueResult;

	const dataString = (() => {
		switch (data.type) {
			case 'normal':
				return `== Probability ==
${data.probability}`;
			// TODO: Add chi-squared and t distributions.
		}
	});

	switch (format) {
		case 'plain':
			return `${instance.name} — Critical Value

=== Data ===

== Distribution ==
${capitalize(data.type)}

${dataString()}

=== Results ===

== Critical value ==
${result.value}`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}