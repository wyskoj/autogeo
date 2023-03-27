import {
	GeocentricForwardsData,
	GeocentricForwardsResult,
} from '../../../types/operation/coordinate-computations/geocentric-forwards';
import { radiansToDMS } from '../../../utils/angle';
import FormatDMS from '../../../utils/format-dms';
import { DataResult } from '../display-common';

export default function GeocentricForwardsDisplay(props: {
	data: GeocentricForwardsData;
	result: GeocentricForwardsResult;
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
					label: 'Longitude',
					value: FormatDMS(radiansToDMS(props.data.longitude)),
				},
				{
					label: 'Ellipsoid Height',
					value: props.data.height.toLocaleString(),
				},
			]}
			result={[
				{
					label: 'X',
					value: props.result.X.toLocaleString(),
				},
				{
					label: 'Y',
					value: props.result.Y.toLocaleString(),
				},
				{
					label: 'Z',
					value: props.result.Z.toLocaleString(),
				},
			]}
		/>
	);
}
