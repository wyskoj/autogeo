import { DistanceDistanceIntersectionData } from './distance-distance-intersection-data';
import { DistanceDistanceIntersectionResult } from './distance-distance-intersection-result';
import { DataResult } from '../../../components/display/display-common';

export function DistanceDistanceIntersectionDisplay(props: {
	data: DistanceDistanceIntersectionData;
	result: DistanceDistanceIntersectionResult;
}) {
	return (
		<DataResult
			data={[
				{
					label: 'Station A',
					value: `(${props.data.station1.x}, ${props.data.station1.y}) `,
				},
				{
					label: 'Distance A',
					value: `${props.data.distance1}`,
				},
				{
					label: 'Station B',
					value: `(${props.data.station2.x}, ${props.data.station2.y})`,
				},
				{
					label: 'Distance B',
					value: `${props.data.distance2}`,
				},
			]}
			result={[
				{
					label: 'Solution 1',
					value: `(${props.result.solution1.x.toLocaleString('en', {
						useGrouping: false,
					})}, ${props.result.solution1.y.toLocaleString('en', {
						useGrouping: false,
					})})`,
				},
				{
					label: 'Solution 2',
					value: `(${props.result.solution2.x.toLocaleString('en', {
						useGrouping: false,
					})}, ${props.result.solution2.y.toLocaleString('en', {
						useGrouping: false,
					})})`,
				},
			]}
		></DataResult>
	);
}
