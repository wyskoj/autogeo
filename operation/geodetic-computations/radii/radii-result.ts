import { z } from 'zod';

export const RadiiResultSchema = z.object({
	radiusPrimeVertical: z.number(),
	radiusMeridian: z.number(),
	radiusAzimuth: z.number(),
});
export type RadiiResult = z.infer<typeof RadiiResultSchema>;
