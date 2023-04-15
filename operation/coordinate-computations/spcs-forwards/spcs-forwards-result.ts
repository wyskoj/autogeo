import { z } from 'zod';

export const SpcsForwardsResultSchema = z.object({
	northing: z.number(),
	easting: z.number(),
	scaleFactor: z.number(),
	convergenceAngle: z.number(),
});
export type SpcsForwardsResult = z.infer<typeof SpcsForwardsResultSchema>;
