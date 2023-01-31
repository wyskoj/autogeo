import { NextApiRequest, NextApiResponse } from 'next';
import {
	DifferentialLevelingDataSchema,
	DifferentialLevelingResults,
} from '../../../../types/operation/least-squares/differential-leveling';
import AdjustDifferentialLeveling from '../../../../comps/operations/least-squares/differential-leveling';
import { ZodError } from 'zod';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<DifferentialLevelingResults | { error: string }>
) {
	try {
		const adjustment = AdjustDifferentialLeveling(
			DifferentialLevelingDataSchema.parse(JSON.parse(req.body))
		);
		res.status(200).json(adjustment);
	} catch (error) {
		if (error instanceof ZodError) {
			res.status(400).json({ error: error.issues[0].message });
			return;
		}
		res.status(400).json({ error: error as string });
	}
}
