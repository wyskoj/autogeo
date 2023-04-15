import { DataResult } from '../../../components/display/display-common';
import { GeocentricInverseResult } from './geocentric-inverse-result';
import { GeocentricInverseData } from './geocentric-inverse-data';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';

export function GeocentricInverseDisplay(props: {
	data: GeocentricInverseData;
	result: GeocentricInverseResult;
}) {
	return (
		<DataResult
			data={[
				{ label: 'X', value: props.data.x },
				{ label: 'Y', value: props.data.y },
				{ label: 'Z', value: props.data.z },
				{ label: 'Ellipsoid', value: props.data.ellipsoid },
			]}
			result={[
				{
					label: 'Latitude',
					value: FormatDMS(radiansToDMS(props.result.latitude)),
				},
				{
					label: 'Longitude',
					value: FormatDMS(radiansToDMS(props.result.longitude)),
				},
				{ label: 'Height', value: props.result.height.toLocaleString() },
			]}
		/>
	);
}
