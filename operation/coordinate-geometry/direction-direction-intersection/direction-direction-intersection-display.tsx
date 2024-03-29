import { DirectionDirectionIntersectionData } from './direction-direction-intersection-data';
import { DirectionDirectionIntersectionResult } from './direction-direction-intersection-result';
import { DataResult, DisplaySpinner } from '../../../components/display/display-common';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { useSettings } from '../../../hooks/use-settings';

export function DirectionDirectionIntersectionDisplay(props: {
	data: DirectionDirectionIntersectionData;
	result: DirectionDirectionIntersectionResult;
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
					value: `(${props.data.station1.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.station1.y.toFixed(settings.coordinateDecimalPlaces)})`,
				},
				{
					label: 'Azimuth A',
					value: `${FormatDMS(radiansToDMS(props.data.azimuth1), settings.angleDecimalPlaces)}`,
				},
				{
					label: 'Station B',
					value: `(${props.data.station2.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.station2.y.toFixed(settings.coordinateDecimalPlaces)})`,
				},
				{
					label: 'Azimuth B',
					value: `${FormatDMS(radiansToDMS(props.data.azimuth2), settings.angleDecimalPlaces)}`,
				},
			]}
			result={[
				{
					label: 'Solution',
					value: `(${props.result.solution.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.result.solution.y.toFixed(settings.coordinateDecimalPlaces)})`,
				},
			]}
		></DataResult>
	);
}
