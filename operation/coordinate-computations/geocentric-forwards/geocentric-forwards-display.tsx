import { DataResult, DisplaySpinner } from '../../../components/display/display-common';
import { FormatLatLon } from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { GeocentricForwardsData } from './geocentric-forwards-data';
import { GeocentricForwardsResult } from './geocentric-forwards-result';
import { useSettings } from '../../../hooks/use-settings';

export default function GeocentricForwardsDisplay(props: {
	data: GeocentricForwardsData;
	result: GeocentricForwardsResult;
}) {
	const {settings} = useSettings();
	if (!settings) {
		return <DisplaySpinner />;
	}
	return (
		<DataResult
			data={[
				{ label: 'Ellipsoid', value: props.data.ellipsoid },
				{
					label: 'Latitude',
					value: FormatLatLon(radiansToDMS(props.data.latitude), settings.latLonDecimalPlaces, 'lat'),
				},
				{
					label: 'Longitude',
					value: FormatLatLon(radiansToDMS(props.data.longitude), settings.latLonDecimalPlaces, 'lon'),
				},
				{
					label: 'Ellipsoid Height',
					value: props.data.height.toFixed(settings.distanceDecimalPlaces),
				},
			]}
			result={[
				{
					label: 'X',
					value: props.result.X.toFixed(settings.distanceDecimalPlaces),
				},
				{
					label: 'Y',
					value: props.result.Y.toFixed(settings.distanceDecimalPlaces),
				},
				{
					label: 'Z',
					value: props.result.Z.toFixed(settings.distanceDecimalPlaces),
				},
			]}
		/>
	);
}