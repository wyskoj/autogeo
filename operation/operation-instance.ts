import { z } from 'zod';
import { DifferentialLevelingDataSchema } from './least-squares/differential-leveling/differential-leveling-data';
import { RadiiDataSchema } from './geodetic-computations/radii/radii-data';
import { GeocentricForwardsDataSchema } from './coordinate-computations/geocentric-forwards/geocentric-forwards-data';
import { OperationSchema } from './operation';
import { DifferentialLevelingResultSchema } from './least-squares/differential-leveling/differential-leveling-result';
import { RadiiResultSchema } from './geodetic-computations/radii/radii-result';
import { GeocentricForwardsResultSchema } from './coordinate-computations/geocentric-forwards/geocentric-forwards-result';
import { GroundSamplingDistanceDataSchema } from './remote-sensing/ground-sampling-distance/ground-sampling-distance-data';
import { GroundSamplingDistanceResultSchema } from './remote-sensing/ground-sampling-distance/ground-sampling-distance-result';
import { DistanceDistanceIntersectionDataSchema } from './coordinate-geometry/distance-distance-intersection/distance-distance-intersection-data';
import { DistanceDistanceIntersectionResultSchema } from './coordinate-geometry/distance-distance-intersection/distance-distance-intersection-result';
import { DirectionDirectionIntersectionDataSchema } from './coordinate-geometry/direction-direction-intersection/direction-direction-intersection-data';
import { DirectionDirectionIntersectionResultSchema } from './coordinate-geometry/direction-direction-intersection/direction-direction-intersection-result';
import { AngleAngleIntersectionDataSchema } from './coordinate-geometry/angle-angle-intersection/angle-angle-intersection-data';
import { AngleAngleIntersectionResultSchema } from './coordinate-geometry/angle-angle-intersection/angle-angle-intersection-result';
import { GeocentricInverseDataSchema } from './coordinate-computations/geocentric-inverse/geocentric-inverse-data';
import { GeocentricInverseResultSchema } from './coordinate-computations/geocentric-inverse/geocentric-inverse-result';
import { SpcsForwardsDataSchema } from './coordinate-computations/spcs-forwards/spcs-forwards-data';
import { SpcsForwardsResultSchema } from './coordinate-computations/spcs-forwards/spcs-forwards-result';
import { SpcsInverseDataSchema } from './coordinate-computations/spcs-inverse/spcs-inverse-data';
import { SpcsInverseResultSchema } from './coordinate-computations/spcs-inverse/spcs-inverse-result';

export const OperationDataSchema = z.union([
	DifferentialLevelingDataSchema,
	RadiiDataSchema,
	GeocentricForwardsDataSchema,
	GeocentricInverseDataSchema,
	GroundSamplingDistanceDataSchema,
	DistanceDistanceIntersectionDataSchema,
	DirectionDirectionIntersectionDataSchema,
	AngleAngleIntersectionDataSchema,
	SpcsForwardsDataSchema,
	SpcsInverseDataSchema,
]);
export type OperationData = z.infer<typeof OperationDataSchema>;
export const OperationResultsSchema = z.union([
	DifferentialLevelingResultSchema,
	RadiiResultSchema,
	GeocentricForwardsResultSchema,
	GeocentricInverseResultSchema,
	GroundSamplingDistanceResultSchema,
	DistanceDistanceIntersectionResultSchema,
	DirectionDirectionIntersectionResultSchema,
	AngleAngleIntersectionResultSchema,
	SpcsForwardsResultSchema,
	SpcsInverseResultSchema,
]);
export type OperationResult = z.infer<typeof OperationResultsSchema>;
export const OperationInstanceSchema = z.object({
	id: z.string(),
	data: OperationDataSchema,
	operation: OperationSchema,
	result: OperationResultsSchema,
	timestamp: z.number(),
	name: z.string(),
	new: z.boolean(),
});
export type OperationInstance = z.infer<typeof OperationInstanceSchema>;
