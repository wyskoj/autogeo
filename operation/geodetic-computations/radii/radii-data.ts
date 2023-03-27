import { z } from 'zod';
import { EllipsoidNameSchema } from '../../misc/ellipsoid/ellipsoid-types';

export const RadiiDataSchema = z.object({
	ellipsoid: EllipsoidNameSchema,
	latitude: z.number(),
	azimuth: z.number(),
});
export type RadiiData = z.infer<typeof RadiiDataSchema>;
