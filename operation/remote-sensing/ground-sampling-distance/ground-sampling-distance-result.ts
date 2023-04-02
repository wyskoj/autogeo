import { z } from 'zod';

export const GroundSamplingDistanceResultSchema = z.object({
	groundSamplingDistance: z.number()
});
export type GroundSamplingDistanceResult = z.infer<typeof GroundSamplingDistanceResultSchema>;