import { DistanceDistanceIntersectionData } from './distance-distance-intersection-data';
import { DistanceDistanceIntersectionResult } from './distance-distance-intersection-result';
import { DataResult, DisplaySpinner } from '../../../components/display/display-common';
import { useSettings } from '../../../hooks/use-settings';

export function DistanceDistanceIntersectionDisplay(props: {
	data: DistanceDistanceIntersectionData;
	result: DistanceDistanceIntersectionResult;
}) {
	const {settings} = useSettings();
	if (!settings) {
		return <DisplaySpinner />;
	}
	return (
		<DataResult
			data={[
				{
					label: 'Station A',
					value: `(${props.data.station1.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.station1.y.toFixed(settings.coordinateDecimalPlaces)}) `,
				},
				{
					label: 'Distance A',
					value: `${props.data.distance1.toFixed(settings.distanceDecimalPlaces)}`,
				},
				{
					label: 'Station B',
					value: `(${props.data.station2.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.station2.y.toFixed(settings.coordinateDecimalPlaces)})`,
				},
				{
					label: 'Distance B',
					value: `${props.data.distance2.toFixed(settings.distanceDecimalPlaces)}`,
				},
			]}
			result={[
				{
					label: 'Solution 1',
					value: `(${props.result.solution1.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.result.solution1.y.toFixed(settings.coordinateDecimalPlaces)})`,
				},
				{
					label: 'Solution 2',
					value: `(${props.result.solution2.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.result.solution2.y.toFixed(settings.coordinateDecimalPlaces)})`,
				},
			]}
		></DataResult>
	);
}
