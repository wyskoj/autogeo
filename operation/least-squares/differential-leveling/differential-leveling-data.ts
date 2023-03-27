import { z } from 'zod';
import { StationElevationSchema } from '../../misc/station-elevation';

export const WeightingSchemeSchema = z.union([
	z.literal('unweighted'),
	z.literal('normal'),
	z.literal('distance'),
	z.literal('stddev'),
]);
export type WeightingScheme = z.infer<typeof WeightingSchemeSchema>;
export const WeightingSchemeDescription: {
	[key in WeightingScheme]: string;
} = {
	unweighted: 'Performs an unweighted adjustment.',
	normal: 'Performs a weighted adjustment where weights are treated normally.',
	distance:
		'Performs a weighted adjustment where weights are treated as distances—weights are computed as inverse the distance.',
	stddev:
		'Performs a weighted adjustment where weights are treated as standard deviations.',
};

export const DifferentialLevelingObservationSchema = z.object({
	from: z.string(),
	to: z.string(),
	deltaElevation: z.number(),
	weight: z.number(),
});
export type DifferentialLevelingObservation = z.infer<
	typeof DifferentialLevelingObservationSchema
>;

export const DifferentialLevelingDataSchema = z.object({
	weightingScheme: WeightingSchemeSchema,
	benchmarks: z.array(StationElevationSchema),
	observations: z.array(DifferentialLevelingObservationSchema),
});
export type DifferentialLevelingData = z.infer<
	typeof DifferentialLevelingDataSchema
>;
