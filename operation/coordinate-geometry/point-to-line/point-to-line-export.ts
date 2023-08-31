import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { UserSettings } from '../../../hooks/use-settings';
import { PointToLineResult } from './point-to-line-result';
import { PointToLineData } from './point-to-line-data';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';

export function PointToLineExport(instance: OperationInstance, format: ExportFormat, settings: UserSettings): string {
	const data = instance.data as PointToLineData;
	const result = instance.result as PointToLineResult;

	switch (format) {
		case 'plain':
			return `${instance.name} — Point to Line
=== Data ===

== Station 1 ==
(${data.station1.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.station1.y.toFixed(settings.coordinateDecimalPlaces)})

== Station 2 ==
(${data.station2.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.station2.y.toFixed(settings.coordinateDecimalPlaces)})

== Point ==
(${data.point.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.point.y.toFixed(settings.coordinateDecimalPlaces)})

=== Results ===

== Distance ==
${result.distance.toFixed(settings.distanceDecimalPlaces)}

== Azimuth ==
${FormatDMS(radiansToDMS(result.azimuth), settings.angleDecimalPlaces)}`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}