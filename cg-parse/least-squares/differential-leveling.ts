import StringReader from '../../utils/string-reader';
import {
	DifferentialLevelingData,
	DifferentialLevelingObservation,
	StationElevation,
	WeightingScheme,
} from '../../types/operation/least-squares/differential-leveling';
import { ParseResult } from '../../types/parse';

export default function DifferentialLevelingParse(
	data: string
): ParseResult<DifferentialLevelingData> {
	const reader = new StringReader(data);

	// Read title
	const title = reader.readLine();

	// Read header
	const header = reader.readLine().split(/\s+/);
	const benchmarkCount = parseInt(header[0]);
	const observationCount = parseInt(header[1]);

	// Read benchmarks
	const benchmarks: StationElevation[] = [];
	for (let i = 0; i < benchmarkCount; i++) {
		let benchLine = reader.readLine().split(/\s+/);
		benchmarks.push({
			station: benchLine[0],
			elevation: parseFloat(benchLine[1]),
		});
	}

	// Read observations
	const observations: DifferentialLevelingObservation[] = [];
	let weighting: WeightingScheme = 'unweighted';
	for (let i = 0; i < observationCount; i++) {
		let observationLine = reader.readLine().split(/\s+/);

		if (i === 0 && observationLine[3]) {
			weighting = 'normal';
		}
		// prevent lines that are missing weights
		if (
			i !== 0 &&
			((weighting === 'unweighted' && observationLine[3]) ||
				(weighting === 'normal' && !observationLine[3]))
		) {
			throw new Error('Data is missing weights.');
		}

		observations.push({
			deltaElevation: parseFloat(observationLine[2]),
			from: observationLine[0],
			to: observationLine[1],
			weight: observationLine[3] ? parseFloat(observationLine[3]) : 1,
		});
	}

	return {
		title: title,
		data: {
			benchmarks: benchmarks,
			observations: observations,
			weightingScheme: weighting,
		},
	};
}
