import { StationCoordinatesSchema } from '../../misc/station-coordinates';
import { z } from 'zod';

export const DistanceDistanceIntersectionResultSchema = z.object({
	solution1: StationCoordinatesSchema,
	solution2: StationCoordinatesSchema,
});
export type DistanceDistanceIntersectionResult = z.infer<
	typeof DistanceDistanceIntersectionResultSchema
>;
