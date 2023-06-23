import { z } from 'zod';

export type Distribution = 'normal' | 'chi-squared' | 't' | 'F';

export const CriticalValueNormalDataSchema = z.object({
	type: z.literal('normal'),
	probability: z.number().min(0).max(100),
});

export const CriticalValueDataSchema = z.union([
	CriticalValueNormalDataSchema,
	z.object({
		type: z.literal('chi-squared'),
		alpha: z.number().min(0).max(1),
		V: z.number().min(1),
	}),
	z.object({
		type: z.literal('t'),
		alpha: z.number().min(0).max(1),
		V: z.number().min(1),
	}),
	z.object({
		type: z.literal('F'),
		alpha: z.number().min(0).max(1),
		V1: z.number().min(1),
		V2: z.number().min(1),
	}),
]);
export type CriticalValueData = z.infer<typeof CriticalValueDataSchema>;
