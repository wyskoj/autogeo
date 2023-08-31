import { z } from 'zod';

export const PointToLineResultSchema = z.object({
	distance: z.number(),
	azimuth: z.number()
});
export type PointToLineResult = z.infer<typeof PointToLineResultSchema>;