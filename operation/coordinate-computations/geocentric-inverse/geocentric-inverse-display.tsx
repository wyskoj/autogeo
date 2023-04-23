import { DataResult, DisplaySpinner } from '../../../components/display/display-common';
import { GeocentricInverseResult } from './geocentric-inverse-result';
import { GeocentricInverseData } from './geocentric-inverse-data';
import FormatDMS, { FormatLatLon } from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { useSettings } from '../../../hooks/use-settings';

export function GeocentricInverseDisplay(props: {
	data: GeocentricInverseData;
	result: GeocentricInverseResult;
}) {
	const {settings} = useSettings();
	if (!settings) {
		return <DisplaySpinner />;
	}
	return (
		<DataResult
			data={[
				{ label: 'X', value: props.data.x.toFixed(settings.coordinateDecimalPlaces) },
				{ label: 'Y', value: props.data.y.toFixed(settings.coordinateDecimalPlaces) },
				{ label: 'Z', value: props.data.z.toFixed(settings.coordinateDecimalPlaces) },
				{ label: 'Ellipsoid', value: props.data.ellipsoid },
			]}
			result={[
				{
					label: 'Latitude',
					value: FormatLatLon(radiansToDMS(props.result.latitude), settings.latLonDecimalPlaces, 'lat'),
				},
				{
					label: 'Longitude',
					value: FormatLatLon(radiansToDMS(props.result.longitude), settings.latLonDecimalPlaces, 'lon'),
				},
				{ label: 'Ellipsoid height', value: props.result.height.toFixed(settings.distanceDecimalPlaces) },
			]}
		/>
	);
}
