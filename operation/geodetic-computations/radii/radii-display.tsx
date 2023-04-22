import { RadiiData } from './radii-data';
import { RadiiResult } from './radii-result';
import { DataResult } from '../../../components/display/display-common';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { useSettings } from '../../../hooks/use-settings';

export default function RadiiDisplay(props: {
	data: RadiiData;
	result: RadiiResult;
}) {
	const {settings} = useSettings();
	if (!settings) {
		return <></>;
	}
	return (
		<DataResult
			data={[
				{ label: 'Ellipsoid', value: props.data.ellipsoid },
				{
					label: 'Latitude',
					value: FormatDMS(radiansToDMS(props.data.latitude), settings.angleDecimalPlaces),
				},
				{
					label: 'Azimuth',
					value: FormatDMS(radiansToDMS(props.data.azimuth), settings.angleDecimalPlaces),
				},
			]}
			result={[
				{
					label: 'Radius of Curvature in the Prime Vertical',
					value: props.result.radiusPrimeVertical.toFixed(settings.distanceDecimalPlaces),
				},
				{
					label: 'Radius of Curvature in the Meridian',
					value: props.result.radiusMeridian.toFixed(settings.distanceDecimalPlaces),
				},
				{
					label: 'Radius of Curvature in the Azimuth',
					value: isNaN(props.result.radiusAzimuth) ? '----' : props.result.radiusAzimuth.toFixed(settings.distanceDecimalPlaces),
				},
			]}
		/>
	);
}
