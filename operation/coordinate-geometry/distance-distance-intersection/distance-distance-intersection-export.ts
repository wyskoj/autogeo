import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { DistanceDistanceIntersectionData } from './distance-distance-intersection-data';
import { DistanceDistanceIntersectionResult } from './distance-distance-intersection-result';

export function DistanceDistanceIntersectionExport(
	instance: OperationInstance,
	format: ExportFormat
): string {
	const data = instance.data as DistanceDistanceIntersectionData;
	const result = instance.result as DistanceDistanceIntersectionResult;

	switch (format) {
		case 'plain':
			return `${instance.name} — Distance-Distance Intersection
=== Data ===

== Point 1 ==
(${data.station1.x}, ${data.station1.y})

== Point 2 ==
(${data.station2.x}, ${data.station2.y})

=== Results ===

== Solution 1 ==
(${result.solution1.x}, ${result.solution1.y})

== Solution 2 ==
(${result.solution2.x}, ${result.solution2.y})`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}