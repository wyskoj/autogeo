import { z } from 'zod';

export const OneVariableStatsResultSchema = z.object({
	mean: z.number(),
	median: z.number(),
	mode: z.number(),
	variance: z.number(),
	standardDeviation: z.number(),
	standardDeviationOfMean: z.number(),
	residuals: z.array(z.number()),
});
export type OneVariableStatsResult = z.infer<typeof OneVariableStatsResultSchema>;