import { z } from 'zod';
import { EllipsoidNameSchema } from '../../misc/ellipsoid/ellipsoid-types';

export const GeocentricInverseDataSchema = z.object({
	ellipsoid: EllipsoidNameSchema,
	x: z.number(),
	y: z.number(),
	z: z.number(),
});
export type GeocentricInverseData = z.infer<typeof GeocentricInverseDataSchema>;
