import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { AngleAngleIntersectionData } from './angle-angle-intersection-data';
import { AngleAngleIntersectionResult } from './angle-angle-intersection-result';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { UserSettings } from '../../../hooks/use-settings';

export function AngleAngleIntersectionExport(
	instance: OperationInstance,
	format: ExportFormat,
	settings: UserSettings
): string {
	const data = instance.data as AngleAngleIntersectionData;
	const result = instance.result as AngleAngleIntersectionResult;

	switch (format) {
		case 'plain':
			return `${instance.name} — Angle-Angle Intersection
=== Data ===

== Occupied Station 1 ==
(${data.occupiedStation1.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.occupiedStation1.y.toFixed(settings.coordinateDecimalPlaces)})

== Backsight Station 1 ==
(${data.backsightStation1.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.backsightStation1.y.toFixed(settings.coordinateDecimalPlaces)})

== Angle 1 ==
${FormatDMS(radiansToDMS(data.angleFromStation1), settings.angleDecimalPlaces)}

== Occupied Station 2 ==
(${data.occupiedStation2.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.occupiedStation2.y.toFixed(settings.coordinateDecimalPlaces)})

== Backsight Station 2 ==
(${data.backsightStation2.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.backsightStation2.y.toFixed(settings.coordinateDecimalPlaces)})

== Angle 2 ==
${FormatDMS(radiansToDMS(data.angleFromStation2), settings.angleDecimalPlaces)}

=== Results ===

== Solution ==
(${result.solution.x.toFixed(settings.coordinateDecimalPlaces)}, ${result.solution.y.toFixed(settings.coordinateDecimalPlaces)})`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}
