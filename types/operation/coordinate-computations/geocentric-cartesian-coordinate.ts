import { z } from 'zod';
import { EllipsoidNameSchema } from '../geodetic/ellipsoid';

const GeocentricForwardDataSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
	height: z.number(),
	ellipsoid: EllipsoidNameSchema,
});
export type GeocentricForwardData = z.infer<typeof GeocentricForwardDataSchema>;

const GeocentricForwardResultSchema = z.object({
	X: z.number(),
	Y: z.number(),
	Z: z.number(),
});
export type GeocentricForwardResult = z.infer<
	typeof GeocentricForwardResultSchema
>;
