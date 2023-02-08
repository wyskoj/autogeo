import { z } from 'zod';
import {
	DifferentialLevelingDataSchema,
	DifferentialLevelingResultsSchema,
} from './operation/least-squares/differential-leveling';
import { OperationSchema } from './operation';
import { RadiiDataSchema, RadiiResultSchema } from './operation/geodetic/radii';

export const OperationDataSchema = z.union([
	DifferentialLevelingDataSchema,
	RadiiDataSchema,
]);
export type OperationData = z.infer<typeof OperationDataSchema>;

export const OperationResultsSchema = z.union([
	DifferentialLevelingResultsSchema,
	RadiiResultSchema,
]);
export type OperationResults = z.infer<typeof OperationResultsSchema>;

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
