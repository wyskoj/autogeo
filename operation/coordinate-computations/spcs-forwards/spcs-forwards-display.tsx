import { SpcsForwardsResult, SpcsForwardsResultSchema } from './spcs-forwards-result';
import { SpcsForwardsData, SpcsForwardsDataSchema } from './spcs-forwards-data';
import { DataResult, DisplaySpinner } from '../../../components/display/display-common';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { useSettings } from '../../../hooks/use-settings';

export function SpcsForwardsDisplay(props: {
	data: SpcsForwardsData;
	result: SpcsForwardsResult;
}) {
	const {settings} = useSettings();
	if (!settings) {
		return <DisplaySpinner />;
	}
	return <DataResult data={[
		{ label: 'Latitude', value: `${FormatDMS(radiansToDMS(props.data.latitude), settings.latLonDecimalPlaces)} N` },
		{ label: 'Longitude', value: `${FormatDMS(radiansToDMS(Math.abs(props.data.longitude)), settings.latLonDecimalPlaces)} W` },
		{ label: 'Zone', value: props.data.zone },
	]} result={[
		{ label: 'Northing', value: props.result.northing.toFixed(settings.coordinateDecimalPlaces) },
		{ label: 'Easting', value: props.result.easting.toFixed(settings.coordinateDecimalPlaces) },
		{ label: 'Scale factor', value: props.result.scaleFactor.toFixed(settings.scaleFactorDecimalPlaces) },
		{ label: 'Convergence angle', value: FormatDMS(radiansToDMS(props.result.convergenceAngle), settings.angleDecimalPlaces)}
	]}></DataResult>;
}
