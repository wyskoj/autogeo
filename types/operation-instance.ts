import { z } from 'zod';
import { OperationSchema } from './operation';
import { DifferentialLevelingDataSchema } from '../operation/least-squares/differential-leveling/differential-leveling-data';
import { DifferentialLevelingResultSchema } from '../operation/least-squares/differential-leveling/differential-leveling-result';
import { RadiiDataSchema } from '../operation/geodetic-computations/radii/radii-data';
import { RadiiResultSchema } from '../operation/geodetic-computations/radii/radii-result';
import {
	GeocentricForwardsDataSchema
} from '../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-data';
import {
	GeocentricForwardsResultSchema
} from '../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-result';

export const OperationDataSchema = z.union([
	DifferentialLevelingDataSchema,
	RadiiDataSchema,
	GeocentricForwardsDataSchema,
]);
export type OperationData = z.infer<typeof OperationDataSchema>;

export const OperationResultsSchema = z.union([
	DifferentialLevelingResultSchema,
	RadiiResultSchema,
	GeocentricForwardsResultSchema,
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
