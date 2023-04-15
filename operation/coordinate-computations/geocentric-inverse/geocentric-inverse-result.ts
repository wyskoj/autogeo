import { z } from 'zod';

export const GeocentricInverseResultSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
	height: z.number(),
});
export type GeocentricInverseResult = z.infer<
	typeof GeocentricInverseResultSchema
>;
