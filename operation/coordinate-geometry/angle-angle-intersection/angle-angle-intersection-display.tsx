import { AngleAngleIntersectionData } from './angle-angle-intersection-data';
import { AngleAngleIntersectionResult } from './angle-angle-intersection-result';
import { DataResult } from '../../../components/display/display-common';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { useSettings } from '../../../hooks/use-settings';

export function AngleAngleIntersectionDisplay(props: {
	data: AngleAngleIntersectionData;
	result: AngleAngleIntersectionResult;
}) {
	const {settings} = useSettings();
	if (!settings) {
		return null;
	}
	return (
		<DataResult
			data={[
				{
					label: 'Occupied Station 1',
					value: `(${props.data.occupiedStation1.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.occupiedStation1.y.toFixed(settings.coordinateDecimalPlaces)})`,
				},
				{
					label: 'Backsight Station 1',
					value: `(${props.data.backsightStation1.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.backsightStation1.y.toFixed(settings.coordinateDecimalPlaces)})`,
				},
				{
					label: 'Angle From Station 1',
					value: `${FormatDMS(radiansToDMS(props.data.angleFromStation1), settings.angleDecimalPlaces)}`,
				},
				{
					label: 'Occupied Station 2',
					value: `(${props.data.occupiedStation2.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.occupiedStation2.y.toFixed(settings.coordinateDecimalPlaces)})`,
				},
				{
					label: 'Backsight Station 2',
					value: `(${props.data.backsightStation2.x.toFixed(settings.coordinateDecimalPlaces)}, ${props.data.backsightStation2.y.toFixed(settings.coordinateDecimalPlaces)})`,
				},
				{
					label: 'Angle From Station 2',
					value: `${FormatDMS(radiansToDMS(props.data.angleFromStation2), settings.angleDecimalPlaces)}`,
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
