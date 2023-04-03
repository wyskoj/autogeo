import { StationCoordinatesSchema } from '../../misc/station-coordinates';
import { z } from 'zod';

export const AngleAngleIntersectionResultSchema = z.object({
	solution: StationCoordinatesSchema,
});
export type AngleAngleIntersectionResult = z.infer<
	typeof AngleAngleIntersectionResultSchema
>;
