import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { UserSettings } from '../../../hooks/use-settings';
import { radiansToDMS } from '../../../utils/angle';
import FormatDMS from '../../../utils/format-dms';
import { SpcsForwardsData } from './spcs-forwards-data';
import { SpcsForwardsResult } from './spcs-forwards-result';

export function SpcsForwardsExport(
	operation: OperationInstance,
	format: ExportFormat,
	settings: UserSettings
): string {
	const data = operation.data as SpcsForwardsData;
	const result = operation.result as SpcsForwardsResult;

	switch (format) {
		case 'plain':
			return `${operation.name} — SPCS Forwards

=== Data ===

== Latitude ==
${FormatDMS(radiansToDMS(data.latitude), settings.latLonDecimalPlaces)} N

== Longitude ==
${FormatDMS(
				radiansToDMS(Math.abs(data.longitude)),
				settings.latLonDecimalPlaces
			)} W

== Ellipsoid ==
${data.ellipsoid}

== Zone ==
${data.zone}

=== Results ===

== Station ==
Easting: ${result.easting.toFixed(
				settings.coordinateDecimalPlaces
			)}, Northing: ${result.northing.toFixed(settings.coordinateDecimalPlaces)}

== Scale factor ==
${result.scaleFactor.toFixed(settings.scaleFactorDecimalPlaces)}

== Convergence ==
${FormatDMS(
				radiansToDMS(result.convergenceAngle),
				settings.angleDecimalPlaces
			)}`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}
