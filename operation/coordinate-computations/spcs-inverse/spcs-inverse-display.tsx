import { SpcsInverseData } from './spcs-inverse-data';
import { SpcsInverseResult } from './spcs-inverse-result';
import { DataResult, DisplaySpinner } from '../../../components/display/display-common';
import { useSettings } from '../../../hooks/use-settings';
import { radiansToDMS } from '../../../utils/angle';
import FormatDMS from '../../../utils/format-dms';

export default function SpcsInverseDisplay(props: {
	data: SpcsInverseData;
	result: SpcsInverseResult;
}) {
	const { settings } = useSettings();
	if (!settings) return <DisplaySpinner />;
	return (
		<DataResult
			data={[
				{
					label: 'Northing',
					value: props.data.northing.toFixed(settings.coordinateDecimalPlaces),
				},
				{
					label: 'Easting',
					value: props.data.easting.toFixed(settings.coordinateDecimalPlaces),
				},
				{ label: 'Zone', value: props.data.zone },
				{ label: 'Ellipsoid', value: props.data.ellipsoid },
			]}
			result={[
				{
					label: 'Latitude',
					value: FormatDMS(
						radiansToDMS(props.result.latitude),
						settings.latLonDecimalPlaces
					),
				},
				{
					label: 'Longitude',
					value: FormatDMS(
						radiansToDMS(Math.abs(props.result.longitude)),
						settings.latLonDecimalPlaces
					),
				},
				{
					label: 'Scale factor',
					value: props.result.scaleFactor.toFixed(
						settings.scaleFactorDecimalPlaces
					),
				},
				{
					label: 'Convergence angle',
					value: FormatDMS(
						radiansToDMS(props.result.convergenceAngle),
						settings.angleDecimalPlaces
					),
				},
			]}
		/>
	);
}
