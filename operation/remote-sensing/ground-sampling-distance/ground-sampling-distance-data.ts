import { z } from 'zod'

export const GroundSamplingDistanceDataSchema = z.object({
	/** The scanning resolution of the sensor, in dots per inch. */
	scanningResolution: z.number(),
	/** The scale denominator of the aerial photograph. */
	scaleDenominator: z.number()
});
export type GroundSamplingDistanceData = z.infer<typeof GroundSamplingDistanceDataSchema>;