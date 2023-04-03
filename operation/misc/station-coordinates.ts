import { z } from 'zod';

export const StationCoordinatesSchema = z.object({
	station: z.string(),
	x: z.number(),
	y: z.number(),
});
export type StationCoordinates = z.infer<typeof StationCoordinatesSchema>;
