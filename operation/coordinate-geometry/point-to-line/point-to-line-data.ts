import { z } from 'zod';
import { StationCoordinatesSchema } from '../../misc/station-coordinates';

export const PointToLineDataSchema = z.object({
	station1: StationCoordinatesSchema,
	station2: StationCoordinatesSchema,
	point: StationCoordinatesSchema,
});
export type PointToLineData = z.infer<typeof PointToLineDataSchema>;