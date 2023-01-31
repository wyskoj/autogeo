import { z } from 'zod';
import {
	DifferentialLevelingDataSchema,
	DifferentialLevelingResultsSchema,
} from './operation/least-squares/differential-leveling';
import { OperationSchema } from './operation';

export const OperationInstanceSchema = z.object({
	id: z.string(),
	data: DifferentialLevelingDataSchema, // todo update when adding another op
	operation: OperationSchema,
	result: DifferentialLevelingResultsSchema, // todo update when adding another op
	timestamp: z.number(),
	name: z.string(),
});
export type OperationInstance = z.infer<typeof OperationInstanceSchema>;
