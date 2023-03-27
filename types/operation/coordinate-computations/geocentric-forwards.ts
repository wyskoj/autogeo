import { z } from 'zod';
import { EllipsoidNameSchema } from '../geodetic/ellipsoid';

export const GeocentricForwardsDataSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
	height: z.number(),
	ellipsoid: EllipsoidNameSchema,
});
export type GeocentricForwardsData = z.infer<
	typeof GeocentricForwardsDataSchema
>;

export const GeocentricForwardsResultSchema = z.object({
	X: z.number(),
	Y: z.number(),
	Z: z.number(),
});
export type GeocentricForwardsResult = z.infer<
	typeof GeocentricForwardsResultSchema
>;
