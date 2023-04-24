import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { UserSettings } from '../../../hooks/use-settings';
import { SpcsInverseData } from './spcs-inverse-data';
import { SpcsInverseResult } from './spcs-inverse-result';
import { radiansToDMS } from '../../../utils/angle';
import FormatDMS from '../../../utils/format-dms';

export function SpcsInverseExport(
	operation: OperationInstance,
	format: ExportFormat,
	settings: UserSettings
): string {
	const data = operation.data as SpcsInverseData;
	const result = operation.result as SpcsInverseResult;

	switch (format) {
		case 'plain':
			return `${operation.name} — SPCS Inverse

=== Data ===

== Station ==
X: ${data.easting.toFixed(
				settings.coordinateDecimalPlaces
			)}, Y: ${data.northing.toFixed(settings.coordinateDecimalPlaces)}

== Ellipsoid ==
${data.ellipsoid}

== Zone ==
${data.zone}

=== Results ===

== Latitude, Longitude ==
${FormatDMS(
	radiansToDMS(result.latitude),
	settings.latLonDecimalPlaces
)}, ${FormatDMS(radiansToDMS(result.longitude), settings.latLonDecimalPlaces)}
			
== Scale factor ==
${result.scaleFactor.toFixed(settings.scaleFactorDecimalPlaces)}			

== Convergence ==
${FormatDMS(radiansToDMS(result.convergenceAngle), settings.angleDecimalPlaces)}
`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}
