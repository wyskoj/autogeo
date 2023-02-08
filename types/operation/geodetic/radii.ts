import { z } from 'zod';
import { EllipsoidNameSchema, EllipsoidSchema } from './ellipsoid';

export const RadiiDataSchema = z.object({
	ellipsoid: EllipsoidNameSchema,
	latitude: z.number(),
	azimuth: z.number(),
});
export type RadiiData = z.infer<typeof RadiiDataSchema>;

export const RadiiResultSchema = z.object({
	radiusPrimeVertical: z.number(),
	radiusMeridian: z.number(),
	radiusAzimuthal: z.number(),
});
export type RadiiResult = z.infer<typeof RadiiResultSchema>;
