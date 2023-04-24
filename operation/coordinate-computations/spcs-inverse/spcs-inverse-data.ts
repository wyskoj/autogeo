import { EllipsoidNameSchema } from '../../misc/ellipsoid/ellipsoid-types';
import { z } from 'zod';
import { SpcsZoneSchema } from '../../misc/spcs/spcs-zones';

export const SpcsInverseDataSchema = z.object({
	ellipsoid: EllipsoidNameSchema,
	zone: SpcsZoneSchema,
	easting: z.number(),
	northing: z.number(),
})
export type SpcsInverseData = z.infer<typeof SpcsInverseDataSchema>