import { z } from 'zod';
import { StationCoordinatesSchema } from '../../misc/station-coordinates';

export const DistanceDistanceIntersectionDataSchema = z.object({
	station1: StationCoordinatesSchema,
	station2: StationCoordinatesSchema,
	distance1: z.number(),
	distance2: z.number(),
});
export type DistanceDistanceIntersectionData = z.infer<
	typeof DistanceDistanceIntersectionDataSchema
>;
