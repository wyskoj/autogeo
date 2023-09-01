import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { UserSettings } from '../../../hooks/use-settings';
import { DistanceDirectionIntersectionData } from './distance-direction-intersection-data';
import { DistanceDirectionIntersectionResult } from './distance-direction-intersection-result';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';

export function DistanceDirectionIntersectionExport(instance: OperationInstance, format: ExportFormat, settings: UserSettings): string {
	const data = instance.data as DistanceDirectionIntersectionData;
	const result = instance.result as DistanceDirectionIntersectionResult;

	switch (format) {
		case 'plain':
			return `${instance.name} — Distance-Direction Intersection
=== Data ===

== Station 1 ==
(${data.point1.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.point1.y.toFixed(settings.coordinateDecimalPlaces)})

== Azimuth ==
${FormatDMS(radiansToDMS(data.azimuth), settings.angleDecimalPlaces)}

== Station 2 ==
(${data.point2.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.point2.y.toFixed(settings.coordinateDecimalPlaces)})

== Distance ==
${data.distance.toFixed(settings.distanceDecimalPlaces)}

=== Results ===

== Solution 1 ==
(${result.solution1.x.toFixed(settings.coordinateDecimalPlaces)}, ${result.solution1.y.toFixed(settings.coordinateDecimalPlaces)})

== Solution 2 ==
(${result.solution2.x.toFixed(settings.coordinateDecimalPlaces)}, ${result.solution2.y.toFixed(settings.coordinateDecimalPlaces)})`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}