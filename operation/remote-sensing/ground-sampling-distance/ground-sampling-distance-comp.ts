import { GroundSamplingDistanceData } from './ground-sampling-distance-data';
import { GroundSamplingDistanceResult } from './ground-sampling-distance-result';

export function GroundSamplingDistanceComp(data: GroundSamplingDistanceData): GroundSamplingDistanceResult {
	const pixelSize = 25.4 / data.scanningResolution;
	return {groundSamplingDistance: (pixelSize * data.scaleDenominator) / 1000};
}