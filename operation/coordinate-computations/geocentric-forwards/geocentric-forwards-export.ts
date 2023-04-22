import { ExportFormat } from '../../../types/export-format';
import capitalize from '../../../utils/capitalize';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { GeocentricForwardsData } from './geocentric-forwards-data';
import { GeocentricForwardsResult } from './geocentric-forwards-result';
import { OperationInstance } from '../../operation-instance';
import { UserSettings } from '../../../hooks/use-settings';

export default function GeocentricForwardsExport(
	instance: OperationInstance,
	format: ExportFormat,
	settings: UserSettings
): string {
	const data = instance.data as GeocentricForwardsData;
	const result = instance.result as GeocentricForwardsResult;
	switch (format) {
		case 'plain':
			return `${instance.name} — Geocentric Forwards
			
=== Data ===
				
== Ellipsoid ==
${capitalize(data.ellipsoid)}
				
== Latitude ==
${FormatDMS(radiansToDMS(data.latitude), settings.latLonDecimalPlaces)}

== Longitude ==
${FormatDMS(radiansToDMS(data.longitude), settings.latLonDecimalPlaces)}

== Ellipsoid Height ==
${data.height.toFixed(settings.distanceDecimalPlaces)}

=== Results ===

== Geocentric X, Y, Z ==
X: ${result.X.toFixed(settings.coordinateDecimalPlaces)}, Y: ${result.Y.toFixed(
				settings.coordinateDecimalPlaces
			)}, Z: ${result.Z.toFixed(settings.coordinateDecimalPlaces)}`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}
