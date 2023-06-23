import { z } from 'zod';

export const CriticalValueResultSchema = z.object({
	value: z.number(),
});
export type CriticalValueResult = z.infer<typeof CriticalValueResultSchema>;