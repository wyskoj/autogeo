import { CGDocs } from '../../types/ghilani';

export const DifferentialLevelingDocs: CGDocs = {
	description:
		'This operation performs a least-squares adjustment on a differential leveling dataset.',
	examples: [
		{
			title: 'Unweighted Example',
			data: `Unweighted example
4 5 6
BMA 100.00
BMB 101.60
BMC 108.05
BMD 106.07
BMA Y 3.68
BMB Y 2.06
Y X 2.02
BMC X -2.37
BMD X -0.38`,
		},
		{
			title: 'Weighted example',
			data: `Weighted example
4 5 6
BMA 100.00
BMB 101.60
BMC 108.05
BMD 106.07
BMA Y 3.68 1.0
BMB Y 2.06 3.0
Y X 2.02 2.0
BMC X -2.37 1.0
BMD X -0.38 2.0`,
		},
	],
	schema: [
		{
			repeated: false,
			properties: [
				{
					description: 'A unique title that identifies this operation.',
					label: 'operation title',
					number_of: false,
					optional: false,
				},
			],
			repetition_description: '',
		},
		{
			repeated: false,
			properties: [
				{
					description: 'The number of benchmarks within the net.',
					label: 'benchmarks',
					number_of: true,
					optional: false,
				},
				{
					description: 'The number of observations within the net.',
					label: 'benchmarks',
					number_of: true,
					optional: false,
				},
				{
					description:
						'The number of total stations within the net, including both benchmarks and turning points.',
					label: 'stations',
					number_of: true,
					optional: false,
				},
			],
			repetition_description: '',
		},
		{
			repeated: true,
			properties: [
				{
					description: 'The name of the station that is a benchmark.',
					label: 'benchmark',
					optional: false,
					number_of: false,
				},
				{
					description: 'The elevation of the benchmark.',
					label: 'elevation',
					optional: false,
					number_of: false,
				},
			],
			repetition_description: 'This line is repeated for each benchmark.',
		},
		{
			repeated: true,
			properties: [
				{
					description: 'The station the observation is made from.',
					label: 'from',
					optional: false,
					number_of: false,
				},
				{
					description: 'The station to which the observation is made.',
					label: 'to',
					optional: false,
					number_of: false,
				},
				{
					description:
						'The observation: the difference in elevation between the two stations.',
					label: 'Δ elevation',
					optional: false,
					number_of: false,
				},
				{
					description: 'Optionally, the weight of the observation.',
					label: 'weight',
					optional: true,
					number_of: false,
				},
			],
			repetition_description: 'This line is repeated for each observation.',
		},
	],
};
