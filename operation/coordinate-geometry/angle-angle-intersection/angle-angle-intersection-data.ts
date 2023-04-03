import { StationCoordinatesSchema } from '../../misc/station-coordinates';
import { z } from 'zod';

export const AngleAngleIntersectionDataSchema = z.object({
	occupiedStation1: StationCoordinatesSchema,
	backsightStation1: StationCoordinatesSchema,
	angleFromStation1: z.number(),
	occupiedStation2: StationCoordinatesSchema,
	backsightStation2: StationCoordinatesSchema,
	angleFromStation2: z.number(),
});
export type AngleAngleIntersectionData = z.infer<
	typeof AngleAngleIntersectionDataSchema
>;
