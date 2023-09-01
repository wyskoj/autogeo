import { z } from 'zod';
import { StationCoordinatesSchema } from '../../misc/station-coordinates';

export const DistanceDirectionIntersectionDataSchema = z.object({
	point1: StationCoordinatesSchema,
	azimuth: z.number(),
	point2: StationCoordinatesSchema,
	distance: z.number(),
});
export type DistanceDirectionIntersectionData = z.infer<
	typeof DistanceDirectionIntersectionDataSchema
>;