import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { GeocentricInverseData } from './geocentric-inverse-data';
import { UserSettings } from '../../../hooks/use-settings';
import { FormatLatLon } from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { GeocentricInverseResult } from './geocentric-inverse-result';

export function GeocentricInverseExport(
	instance: OperationInstance,
	format: ExportFormat,
	settings: UserSettings
): string {
	const data = instance.data as GeocentricInverseData;
	const result = instance.result as GeocentricInverseResult;

	switch (format) {
		case 'plain':
			return `${instance.name} — Geocentric Inverse

=== Data ===

== X, Y, Z == 
${data.x.toFixed(settings.coordinateDecimalPlaces)}, ${data.y.toFixed(
				settings.coordinateDecimalPlaces
			)}, ${data.z.toFixed(settings.coordinateDecimalPlaces)}

== Ellipsoid ==
${data.ellipsoid}

=== Result ===

== Latitude ==
${FormatLatLon(
	radiansToDMS(result.latitude),
	settings.latLonDecimalPlaces,
	'lat'
)}

== Longitude ==
${FormatLatLon(
	radiansToDMS(result.longitude),
	settings.latLonDecimalPlaces,
	'lon'
)}

== Ellipsoid Height ==
${result.height.toFixed(settings.distanceDecimalPlaces)}`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}
