import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { DirectionDirectionIntersectionData } from './direction-direction-intersection-data';
import { DirectionDirectionIntersectionResult } from './direction-direction-intersection-result';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { UserSettings } from '../../../hooks/use-settings';

export function DirectionDirectionIntersectionExport(
	instance: OperationInstance,
	format: ExportFormat,
	settings: UserSettings
): string {
	const data = instance.data as DirectionDirectionIntersectionData;
	const result = instance.result as DirectionDirectionIntersectionResult;

	switch (format) {
		case 'plain':
			return `${instance.name} — Direction-Direction Intersection
=== Data ===

== Station 1 ==
(${data.station1.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.station1.y.toFixed(settings.coordinateDecimalPlaces)})

== Azimuth 1 ==
${FormatDMS(radiansToDMS(data.azimuth1), settings.angleDecimalPlaces)}

== Station 2 ==
(${data.station2.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.station2.y.toFixed(settings.coordinateDecimalPlaces)})

== Azimuth 2 ==
${FormatDMS(radiansToDMS(data.azimuth2), settings.angleDecimalPlaces)}

=== Results ===

== Solution ==
(${result.solution.x.toFixed(settings.coordinateDecimalPlaces)}, ${result.solution.y.toFixed(settings.coordinateDecimalPlaces)})`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}
