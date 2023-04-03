import { AngleAngleIntersectionData } from './angle-angle-intersection-data';
import { AngleAngleIntersectionResult } from './angle-angle-intersection-result';
import { DataResult } from '../../../components/display/display-common';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';

export function AngleAngleIntersectionDisplay(props: {
	data: AngleAngleIntersectionData;
	result: AngleAngleIntersectionResult;
}) {
	return (
		<DataResult
			data={[
				{
					label: 'Occupied Station 1',
					value: `(${props.data.occupiedStation1.x}, ${props.data.occupiedStation1.y})`,
				},
				{
					label: 'Backsight Station 1',
					value: `(${props.data.backsightStation1.x}, ${props.data.backsightStation1.y})`,
				},
				{
					label: 'Angle From Station 1',
					value: `${FormatDMS(radiansToDMS(props.data.angleFromStation1))}`,
				},
				{
					label: 'Occupied Station 2',
					value: `(${props.data.occupiedStation2.x}, ${props.data.occupiedStation2.y})`,
				},
				{
					label: 'Backsight Station 2',
					value: `(${props.data.backsightStation2.x}, ${props.data.backsightStation2.y})`,
				},
				{
					label: 'Angle From Station 2',
					value: `${FormatDMS(radiansToDMS(props.data.angleFromStation2))}`,
				},
			]}
			result={[
				{
					label: 'Solution',
					value: `(${props.result.solution.x.toLocaleString('en', {
						useGrouping: false,
					})}, ${props.result.solution.y.toLocaleString('en', {
						useGrouping: false,
					})})`,
				},
			]}
		></DataResult>
	);
}
