import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';
import { AngleAngleIntersectionData } from './angle-angle-intersection-data';
import { AngleAngleIntersectionResult } from './angle-angle-intersection-result';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';

export function AngleAngleIntersectionExport(
	instance: OperationInstance,
	format: ExportFormat
): string {
	const data = instance.data as AngleAngleIntersectionData;
	const result = instance.result as AngleAngleIntersectionResult;

	switch (format) {
		case 'plain':
			return `${instance.name} — Angle-Angle Intersection
=== Data ===

== Occupied Station 1 ==
(${data.occupiedStation1.x}, ${data.occupiedStation1.y})

== Backsight Station 1 ==
(${data.backsightStation1.x}, ${data.backsightStation1.y})

== Angle 1 ==
${FormatDMS(radiansToDMS(data.angleFromStation1))}

== Occupied Station 2 ==
(${data.occupiedStation2.x}, ${data.occupiedStation2.y})

== Backsight Station 2 ==
(${data.backsightStation2.x}, ${data.backsightStation2.y})

== Angle 2 ==
${FormatDMS(radiansToDMS(data.angleFromStation2))}

=== Results ===

== Solution ==
(${result.solution.x}, ${result.solution.y})`;
		case 'json':
			return JSON.stringify({ data, result });
	}
}
