import { Matrix } from '../../../comps/matrix';
import { DifferentialLevelingData } from './differential-leveling-data';
import { DifferentialLevelingResult } from './differential-leveling-result';
import { AdjustLeastSquares } from '../least-squares';

export default function DifferentialLevelingComp(
	data: DifferentialLevelingData
): DifferentialLevelingResult {
	const unknownNames = [
		...data.observations.map(x => x.to),
		...data.observations.map(x => x.from),
	]
		.filter(
			(x, i, a) =>
				a.indexOf(x) === i && !data.benchmarks.map(b => b.station).includes(x)
		)
		.sort();

	const { X,V,So } = AdjustLeastSquares(
		unknownNames.length,
		data.observations.length,
		(i, j) => {
			if (unknownNames[j] === data.observations[i].from) {
				return -1;
			} else if (unknownNames[j] === data.observations[i].to) {
				return 1;
			} else {
				return 0;
			}
		},
		i => {
			let B;
			if (data.benchmarks.find(x => x.station === data.observations[i].from)) {
				B = -data.benchmarks.find(
					x => x.station === data.observations[i].from
				)!!.elevation;
			} else if (
				data.benchmarks.find(x => x.station === data.observations[i].to)
			) {
				B = data.benchmarks.find(x => x.station === data.observations[i].to)!!
					.elevation;
			} else {
				B = 0;
			}
			return data.observations[i].deltaElevation - B;
		},
		i => {
			switch (data.weightingScheme) {
				case 'unweighted':
					return 1;
				case 'normal':
					return data.observations[i].weight;
				case 'distance':
					return 1 / data.observations[i].weight;
				case 'stddev':
					return 1 / data.observations[i].weight ** 2;
			}
		}
	);


	return {
		adjustedStations: [...unknownNames].map((station, i) => ({
			station: station,
			elevation: X[i],
		})),
		referenceStdDev: isNaN(So) ? 0 : So,
		residuals: data.observations.map((observation, i) => ({
			from: observation.from,
			to: observation.to,
			residual: V[i],
		})),
	};
}
