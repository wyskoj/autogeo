import { StationCoordinatesSchema } from '../../misc/station-coordinates';
import { z } from 'zod';

export const DirectionDirectionIntersectionDataSchema = z.object({
	station1: StationCoordinatesSchema,
	station2: StationCoordinatesSchema,
	azimuth1: z.number(),
	azimuth2: z.number(),
});
export type DirectionDirectionIntersectionData = z.infer<
	typeof DirectionDirectionIntersectionDataSchema
>;
