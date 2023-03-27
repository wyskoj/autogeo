import {
	RadiiData,
	RadiiResult,
} from '../../../types/operation/geodetic/radii';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { DataResult } from '../display-common';

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
					value: props.result.radiusAzimuth.toLocaleString(),
				},
			]}
		/>
	);
}
