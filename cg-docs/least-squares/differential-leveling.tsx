import { Code, Heading, Text, Tooltip, VStack } from '@chakra-ui/react';
import FileFormatHelp from '../../components/help/file-format-help';

export default function DifferentialLeveling() {
	return (
		<VStack align={'start'}>
			<Text>
				This operation performs a least-squares adjustment on a differential
				leveling dataset.
			</Text>
			<Heading
				as="h5"
				size="sm"
			>
				File Format
				<FileFormatHelp />
			</Heading>
			<Code
				display={'block'}
				whiteSpace={'pre'}
				width={'100%'}
				p={2}
			>
				<Tooltip label={'A unique title that identifies this operation.'}>
					{`<operation title>`}
				</Tooltip>
				{'\n'}
				<Tooltip label={'The number of benchmarks within the net.'}>
					{`<benchmarks#>`}
				</Tooltip>{' '}
				<Tooltip label={'The number of observations within the net.'}>
					{`<observations#>`}
				</Tooltip>{' '}
				<Tooltip
					label={
						'The number of total stations within the net, including both benchmarks and turning points.'
					}
				>
					{`<stations#>`}
				</Tooltip>
				{'\n'}
				<Tooltip label={'The name of the station that is a benchmark.'}>
					{`<benchmark>`}
				</Tooltip>{' '}
				<Tooltip label={'The elevation of the benchmark.'}>
					{`<elevation>`}
				</Tooltip>
				<Tooltip
					label={'This line is repeated for each benchmark.'}
				>{`[]`}</Tooltip>
				{'\n'}
				<Tooltip label={'The station the observation is made from.'}>
					{`<from>`}
				</Tooltip>{' '}
				<Tooltip
					label={'The station to which the observation is made.'}
				>{`<to>`}</Tooltip>{' '}
				<Tooltip
					label={
						'The observation: the difference in elevation between the two stations.'
					}
				>{`<Δ elevation>`}</Tooltip>{' '}
				<Tooltip
					label={'Optionally, the weight of the observation.'}
				>{`<weight?>`}</Tooltip>
				<Tooltip
					label={'This line is repeated for each observation.'}
				>{`[]`}</Tooltip>
			</Code>
			<Heading
				as="h5"
				size="sm"
			>
				Examples
			</Heading>
			<Heading
				as="h6"
				size="xs"
			>
				Without weights
			</Heading>
			<Code
				display={'block'}
				whiteSpace={'pre'}
				width={'100%'}
				p={2}
			>
				{`Unweighted example
4 5 6
BMA 100.00
BMB 101.60
BMC 108.05
BMD 106.07
BMA Y 3.68
BMB Y 2.06
Y X 2.02
BMC X -2.37
BMD X -0.38`}
			</Code>

			<Heading
				as="h6"
				size="xs"
			>
				With weights
			</Heading>
			<Code
				display={'block'}
				whiteSpace={'pre'}
				width={'100%'}
				p={2}
			>
				{`Weighted example
4 5 6
BMA 100.00
BMB 101.60
BMC 108.05
BMD 106.07
BMA Y 3.68 1.0
BMB Y 2.06 3.0
Y X 2.02 2.0
BMC X -2.37 1.0
BMD X -0.38 2.0`}
			</Code>
		</VStack>
	);
}
