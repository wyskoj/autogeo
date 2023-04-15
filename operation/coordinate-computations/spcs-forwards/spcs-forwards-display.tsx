import { SpcsForwardsResult, SpcsForwardsResultSchema } from './spcs-forwards-result';
import { SpcsForwardsData, SpcsForwardsDataSchema } from './spcs-forwards-data';
import { DataResult } from '../../../components/display/display-common';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';

export function SpcsForwardsDisplay(props: {
	data: SpcsForwardsData;
	result: SpcsForwardsResult;
}) {
	return <DataResult data={[
		{ label: 'Latitude', value: FormatDMS(radiansToDMS(props.data.latitude)) },
		{ label: 'Longitude', value: FormatDMS(radiansToDMS(props.data.longitude)) },
		{ label: 'Zone', value: props.data.zone },
	]} result={[
		{ label: 'Northing', value: props.result.northing.toFixed(3) },
		{ label: 'Easting', value: props.result.easting.toFixed(3) },
		{ label: 'Scale factor', value: props.result.scaleFactor.toFixed(10) },
		{ label: 'Convergence angle', value: FormatDMS(radiansToDMS(props.result.convergenceAngle))}
	]}></DataResult>;
}
