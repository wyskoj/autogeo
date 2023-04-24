import { z } from 'zod';

export const OneVariableStatsDataSchema = z.object({
	values: z.number().array(),
});
export type OneVariableStatsData = z.infer<typeof OneVariableStatsDataSchema>;