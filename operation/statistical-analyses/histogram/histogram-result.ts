import { z } from 'zod';

export const HistogramResultSchema = z.object({
	binValues: z.array(
		z.object({
			range: z.object({
				min: z.number(),
				max: z.number(),
			}),
			value: z.number(),
		})
	),
});
export type HistogramResult = z.infer<typeof HistogramResultSchema>;