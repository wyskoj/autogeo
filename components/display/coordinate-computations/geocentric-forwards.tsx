import {
	GeocentricForwardData,
	GeocentricForwardResult,
} from '../../../types/operation/coordinate-computations/geocentric-cartesian-coordinate';
import { radiansToDMS } from '../../../utils/angle';
import FormatDMS from '../../../utils/format-dms';
import { DataAndResults } from '../display-common';

export default function GeocentricForwardsDisplay(props: {
	data: GeocentricForwardData;
	results: GeocentricForwardResult;
}) {
	return (
		<DataAndResults
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
			results={[
				{
					label: 'X',
					value: props.results.X.toLocaleString(),
				},
				{
					label: 'Y',
					value: props.results.Y.toLocaleString(),
				},
				{
					label: 'Z',
					value: props.results.Z.toLocaleString(),
				},
			]}
		/>
	);
}
