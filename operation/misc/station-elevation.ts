import { z } from 'zod';

export const StationElevationSchema = z.object({
	station: z.string(),
	elevation: z.number(),
});
export type StationElevation = z.infer<typeof StationElevationSchema>;
