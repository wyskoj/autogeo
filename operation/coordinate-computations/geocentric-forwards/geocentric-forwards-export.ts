import { OperationInstance } from '../../../types/operation-instance';
import { ExportFormat } from '../../../types/export-format';
import capitalize from '../../../utils/capitalize';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { GeocentricForwardsData } from './geocentric-forwards-data';
import { GeocentricForwardsResult } from './geocentric-forwards-result';

export default function GeocentricForwardsExport(
	instance: OperationInstance,
	format: ExportFormat
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
${FormatDMS(radiansToDMS(data.latitude))}

== Longitude ==
${FormatDMS(radiansToDMS(data.longitude))}

== Ellipsoid Height ==
${data.height}

=== Results ===

== Geocentric X, Y, Z ==
X: ${result.X}, Y: ${result.Y}, Z: ${result.Z}`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}