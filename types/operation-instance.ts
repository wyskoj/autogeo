import { z } from 'zod';
import {
	DifferentialLevelingDataSchema,
	DifferentialLevelingResultSchema,
} from './operation/least-squares/differential-leveling';
import { OperationSchema } from './operation';
import { RadiiDataSchema, RadiiResultSchema } from './operation/geodetic/radii';
import {
	GeocentricForwardsDataSchema,
	GeocentricForwardsResultSchema,
} from './operation/coordinate-computations/geocentric-forwards';

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
