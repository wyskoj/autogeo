import { DistanceDirectionIntersectionResult } from './distance-direction-intersection-result';
import { DistanceDirectionIntersectionData } from './distance-direction-intersection-data';
import { useSettings } from '../../../hooks/use-settings';
import { DataResult, DisplaySpinner } from '../../../components/display/display-common';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';

export function DistanceDirectionIntersectionDisplay(props: {
	data: DistanceDirectionIntersectionData;
	result: DistanceDirectionIntersectionResult;
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
					value: `(${props.data.point1.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.point1.y.toFixed(settings.coordinateDecimalPlaces)})`,
				},
				{
					label: 'Azimuth',
					value: `${FormatDMS(radiansToDMS(props.data.azimuth), settings.angleDecimalPlaces)}`,
				},
				{
					label: 'Station B',
					value: `(${props.data.point2.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.point2.y.toFixed(settings.coordinateDecimalPlaces)})`,
				},
				{
					label: 'Distance',
					value: `${props.data.distance.toFixed(settings.distanceDecimalPlaces)}`,
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
				}
			]}
		></DataResult>
	);
}