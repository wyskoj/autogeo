import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { DistanceDistanceIntersectionData } from './distance-distance-intersection-data';
import { DistanceDistanceIntersectionResult } from './distance-distance-intersection-result';
import { UserSettings } from '../../../hooks/use-settings';

export function DistanceDistanceIntersectionExport(
	instance: OperationInstance,
	format: ExportFormat,
	settings: UserSettings
): string {
	const data = instance.data as DistanceDistanceIntersectionData;
	const result = instance.result as DistanceDistanceIntersectionResult;

	switch (format) {
		case 'plain':
			return `${instance.name} — Distance-Distance Intersection
=== Data ===

== Point 1 ==
(${data.station1.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.station1.y.toFixed(settings.coordinateDecimalPlaces)})

== Point 2 ==
(${data.station2.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.station2.y.toFixed(settings.coordinateDecimalPlaces)})

=== Results ===

== Solution 1 ==
(${result.solution1.x.toFixed(settings.coordinateDecimalPlaces)}, ${result.solution1.y.toFixed(settings.coordinateDecimalPlaces)})

== Solution 2 ==
(${result.solution2.x.toFixed(settings.coordinateDecimalPlaces)}, ${result.solution2.y.toFixed(settings.coordinateDecimalPlaces)})`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}