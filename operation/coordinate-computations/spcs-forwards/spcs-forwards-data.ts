import { z } from 'zod';
import { SpcsZone, SpcsZoneSchema } from '../../misc/spcs/spcs-zones';
import { EllipsoidNameSchema } from '../../misc/ellipsoid/ellipsoid-types';

export const SpcsForwardsDataSchema = z.object({
	ellipsoid: EllipsoidNameSchema,
	zone: SpcsZoneSchema,
	latitude: z.number(),
	longitude: z.number(),
});
export type SpcsForwardsData = z.infer<typeof SpcsForwardsDataSchema>;
