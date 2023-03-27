import { z } from 'zod';

export const GeocentricForwardsResultSchema = z.object({
	X: z.number(),
	Y: z.number(),
	Z: z.number(),
});
export type GeocentricForwardsResult = z.infer<
	typeof GeocentricForwardsResultSchema
>;