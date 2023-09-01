import { z } from 'zod';
import { StationCoordinatesSchema } from '../../misc/station-coordinates';

export const DistanceDirectionIntersectionResultSchema = z.object({
	solution1: StationCoordinatesSchema,
	solution2: StationCoordinatesSchema,
});
export type DistanceDirectionIntersectionResult = z.infer<
	typeof DistanceDirectionIntersectionResultSchema
>;