import { z } from 'zod';

export const SpcsInverseResultSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
	scaleFactor: z.number(),
	convergenceAngle: z.number(),
});
export type SpcsInverseResult = z.infer<typeof SpcsInverseResultSchema>;