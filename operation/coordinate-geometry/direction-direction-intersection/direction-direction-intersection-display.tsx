import { DirectionDirectionIntersectionData } from './direction-direction-intersection-data';
import { DirectionDirectionIntersectionResult } from './direction-direction-intersection-result';
import { DataResult } from '../../../components/display/display-common';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';

export function DirectionDirectionIntersectionDisplay(props: {
	data: DirectionDirectionIntersectionData;
	result: DirectionDirectionIntersectionResult;
}) {
	return (
		<DataResult
			data={[
				{
					label: 'Station A',
					value: `(${props.data.station1.x}, ${props.data.station1.y})`,
				},
				{
					label: 'Azimuth A',
					value: `${FormatDMS(radiansToDMS(props.data.azimuth1))}`,
				},
				{
					label: 'Station B',
					value: `(${props.data.station2.x}, ${props.data.station2.y})`,
				},
				{
					label: 'Azimuth B',
					value: `${FormatDMS(radiansToDMS(props.data.azimuth2))}`,
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
