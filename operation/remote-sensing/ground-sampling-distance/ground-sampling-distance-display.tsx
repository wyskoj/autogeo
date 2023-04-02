import { GroundSamplingDistanceData } from './ground-sampling-distance-data';
import { GroundSamplingDistanceResult } from './ground-sampling-distance-result';
import { DataResult } from '../../../components/display/display-common';

export function GroundSamplingDistanceDisplay(props: {
	data: GroundSamplingDistanceData,
	result: GroundSamplingDistanceResult
}) {
	return <DataResult data={[{ label: 'Scanning resolution', value: props.data.scanningResolution }, {
		label: 'Scale denominator',
		value: props.data.scaleDenominator
	}]} result={[{ label: 'Ground sampling distance', value: props.result.groundSamplingDistance }]} />;
}