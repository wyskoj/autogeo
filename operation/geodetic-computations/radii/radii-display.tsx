import { RadiiData } from './radii-data';
import { RadiiResult } from './radii-result';
import { DataResult } from '../../../components/display/display-common';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';

export default function RadiiDisplay(props: {
	data: RadiiData;
	result: RadiiResult;
}) {
	return (
		<DataResult
			data={[
				{ label: 'Ellipsoid', value: props.data.ellipsoid },
				{
					label: 'Latitude',
					value: FormatDMS(radiansToDMS(props.data.latitude)),
				},
				{
					label: 'Azimuth',
					value: FormatDMS(radiansToDMS(props.data.azimuth)),
				},
			]}
			result={[
				{
					label: 'Radius of Curvature in the Prime Vertical',
					value: props.result.radiusPrimeVertical.toLocaleString(),
				},
				{
					label: 'Radius of Curvature in the Meridian',
					value: props.result.radiusMeridian.toLocaleString(),
				},
				{
					label: 'Radius of Curvature in the Azimuth',
					value: isNaN(props.result.radiusAzimuth) ? '----' : props.result.radiusAzimuth.toLocaleString(),
				},
			]}
		/>
	);
}
