import { z } from 'zod';
import { EllipsoidNameSchema } from './ellipsoid';

export const RadiiDataSchema = z.object({
	ellipsoid: EllipsoidNameSchema,
	latitude: z.number(),
	azimuth: z.number(),
});
export type RadiiData = z.infer<typeof RadiiDataSchema>;

export const RadiiResultSchema = z.object({
	radiusPrimeVertical: z.number(),
	radiusMeridian: z.number(),
	radiusAzimuth: z.number(),
});
export type RadiiResults = z.infer<typeof RadiiResultSchema>;
