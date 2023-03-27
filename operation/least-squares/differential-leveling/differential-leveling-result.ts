import { z } from 'zod';
import { StationElevationSchema } from '../../misc/station-elevation';

export const DifferentialLevelingObservationResidualSchema = z.object({
	from: z.string(),
	to: z.string(),
	residual: z.number(),
});
export type DifferentialLevelingObservationResidual = z.infer<
	typeof DifferentialLevelingObservationResidualSchema
>;
export const DifferentialLevelingResultSchema = z.object({
	adjustedStations: z.array(StationElevationSchema),
	residuals: z.array(DifferentialLevelingObservationResidualSchema),
	referenceStdDev: z.number(),
});
export type DifferentialLevelingResult = z.infer<
	typeof DifferentialLevelingResultSchema
>;
