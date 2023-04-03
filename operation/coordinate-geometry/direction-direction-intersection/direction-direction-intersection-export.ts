import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { DirectionDirectionIntersectionData } from './direction-direction-intersection-data';
import { DirectionDirectionIntersectionResult } from './direction-direction-intersection-result';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';

export function DirectionDirectionIntersectionExport(
	instance: OperationInstance,
	format: ExportFormat
): string {
	const data = instance.data as DirectionDirectionIntersectionData;
	const result = instance.result as DirectionDirectionIntersectionResult;

	switch (format) {
		case 'plain':
			return `${instance.name} — Direction-Direction Intersection
=== Data ===

== Station 1 ==
(${data.station1.x}, ${data.station1.y})

== Azimuth 1 ==
${FormatDMS(radiansToDMS(data.azimuth1))}

== Station 2 ==
(${data.station2.x}, ${data.station2.y})

== Azimuth 2 ==
${FormatDMS(radiansToDMS(data.azimuth2))}

=== Results ===

== Solution ==
(${result.solution.x}, ${result.solution.y})`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}
