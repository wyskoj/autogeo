import { StationCoordinatesSchema } from '../../misc/station-coordinates';
import { z } from 'zod';

export const DirectionDirectionIntersectionResultSchema = z.object({
	solution: StationCoordinatesSchema,
});
export type DirectionDirectionIntersectionResult = z.infer<
	typeof DirectionDirectionIntersectionResultSchema
>;
