import {
	DistanceDistanceIntersectionData
} from '../distance-distance-intersection/distance-distance-intersection-data';
import {
	DistanceDistanceIntersectionResult
} from '../distance-distance-intersection/distance-distance-intersection-result';
import { useSettings } from '../../../hooks/use-settings';
import { DataResult, DisplaySpinner } from '../../../components/display/display-common';
import { PointToLineData } from './point-to-line-data';
import { PointToLineResult } from './point-to-line-result';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';

export function PointToLineDisplay(props: {
	data: PointToLineData;
	result: PointToLineResult;
}) {
	const { settings } = useSettings();
	if (!settings) {
		return <DisplaySpinner />;
	}
	return (
		<DataResult
			data={[
				{
					label: 'Station A',
					value: `(${props.data.station1.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.station1.y.toFixed(settings.coordinateDecimalPlaces)}) `
				},
				{
					label: 'Station B',
					value: `(${props.data.station2.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.station2.y.toFixed(settings.coordinateDecimalPlaces)})`
				},
				{
					label: 'Point',
					value: `(${props.data.point.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.point.y.toFixed(settings.coordinateDecimalPlaces)})`
				}
			]}
			result={[
				{
					label: 'Distance',
					value: `${props.result.distance.toFixed(settings.distanceDecimalPlaces)}`
				},
				{
					label: 'Azimuth',
					value: FormatDMS(radiansToDMS(props.result.azimuth), settings.angleDecimalPlaces)
				}
			]}
		></DataResult>
	);
}
