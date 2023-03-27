import { z } from 'zod';
import { EllipsoidNameSchema } from '../../misc/ellipsoid/ellipsoid-types';

export const GeocentricForwardsDataSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
	height: z.number(),
	ellipsoid: EllipsoidNameSchema,
});
export type GeocentricForwardsData = z.infer<
	typeof GeocentricForwardsDataSchema
>;