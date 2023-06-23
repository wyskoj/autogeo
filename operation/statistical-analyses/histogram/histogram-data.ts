import { z } from 'zod';

export type HistogramBucketType = 'count' | 'width' | 'stddev';
const HistogramBucketInfoSchema = z.object({
	type: z.union([z.literal('count'), z.literal('width'), z.literal('stddev')]),
	value: z.number()
})
export type HistogramBucketInfo = z.infer<typeof HistogramBucketInfoSchema>;

export const HistogramDataSchema = z.object({
	values: z.array(z.number()),
	bucket: HistogramBucketInfoSchema,
});

export type HistogramData = z.infer<typeof HistogramDataSchema>;