import { ExportFormat } from '../../../types/export-format';
import { RadiiData } from './radii-data';
import { RadiiResult } from './radii-result';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { OperationInstance } from '../../operation-instance';
import { UserSettings } from '../../../hooks/use-settings';

export default function RadiiExport(
	instance: OperationInstance,
	format: ExportFormat,
	settings: UserSettings
): string {
	const data = instance.data as RadiiData;
	const result = instance.result as RadiiResult;
	switch (format) {
		case 'plain':
			return `${instance.name} — Radii

=== Data ===

== Ellipsoid ==
${data.ellipsoid}

== Latitude ==
${FormatDMS(radiansToDMS(data.latitude), settings.latLonDecimalPlaces)}

== Azimuth ==
${FormatDMS(radiansToDMS(data.azimuth), settings.angleDecimalPlaces)}

=== Results ===

== Radius of curvature in the Prime Vertical ==
${result.radiusPrimeVertical.toFixed(settings.distanceDecimalPlaces)}

== Radius of curvature in the Meridian ==
${result.radiusMeridian.toFixed(settings.distanceDecimalPlaces)}

== Radius of curvature in the Azimuth ==
${result.radiusAzimuth.toFixed(settings.distanceDecimalPlaces)}`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}