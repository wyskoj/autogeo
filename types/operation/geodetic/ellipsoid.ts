import { z } from 'zod';

export const EllipsoidSchema = z.object({
	a: z.number(),
	b: z.number(),
});
export type Ellipsoid = z.infer<typeof EllipsoidSchema>;

export const EllipsoidNameSchema = z.union([
	z.literal('GRS80'),
	z.literal('WGS84'),
]);
export type EllipsoidName = z.infer<typeof EllipsoidNameSchema>;

export const LatitudeHemisphereSchema = z.union([
	z.literal('N'),
	z.literal('S'),
]);
export type LatitudeHemisphere = z.infer<typeof LatitudeHemisphereSchema>;

export const LongitudeHemisphereSchema = z.union([
	z.literal('E'),
	z.literal('W'),
]);
export type LongitudeHemisphere = z.infer<typeof LongitudeHemisphereSchema>;
