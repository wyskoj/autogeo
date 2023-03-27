import { OperationInstance } from '../../../types/operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { RadiiData } from './radii-data';
import { RadiiResult } from './radii-result';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';

export default function RadiiExport(
	instance: OperationInstance,
	format: ExportFormat
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
${FormatDMS(radiansToDMS(data.latitude))}

== Azimuth ==
${FormatDMS(radiansToDMS(data.azimuth))}

=== Results ===

== Radius of curvature in the Prime Vertical ==
${result.radiusPrimeVertical}

== Radius of curvature in the Meridian ==
${result.radiusMeridian}

== Radius of curvature in the Azimuth ==
${result.radiusAzimuth}`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}