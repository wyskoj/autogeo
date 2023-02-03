import HelpButton from '../help-button';
import {
	Box,
	Heading,
	ListItem,
	Text,
	UnorderedList,
	VStack,
} from '@chakra-ui/react';
import { BlockMath } from 'react-katex';

export function WeightingSchemeHelp() {
	return (
		<HelpButton
			modalTitle={'Weighting scheme'}
			modalContent={
				<VStack
					spacing={4}
					align={'start'}
				>
					<Text fontSize="md">
						Weighting schemes are used to adjust the observations to account for{' '}
						<strong>variable observation errors</strong>. The weighting scheme
						is applied to the observations during the least-squares operation.
					</Text>
					<Heading
						as="h4"
						size="md"
					>
						Directions
					</Heading>
					<Text fontSize="md">
						Select a weighting scheme. If not unweighted, enter the weight value
						for each observation in the <em>Observations</em> data table.
					</Text>
					<Heading
						as="h4"
						size="md"
					>
						Options
					</Heading>
					<Box ml={4}>
						<UnorderedList>
							<ListItem>
								<strong>Unweighted</strong> &mdash; Equal weight is given to all
								observations. This is the default option.
								<BlockMath math={'w=1'} />
							</ListItem>
							<ListItem>
								<strong>Normal</strong> &mdash; The weight of each observation
								is equal to the entered value.
								<BlockMath math={`w=w`} />
							</ListItem>
							<ListItem>
								<strong>Distance</strong> &mdash; The weight of each observation
								is inversely proportional to the distance between the two
								stations.
								<BlockMath math={`w=\\frac{1}{\\text{length}}`} />
							</ListItem>
							<ListItem>
								<strong>Standard deviations</strong> &mdash; The weight of each
								observation is inversely proportional to the standard deviation
								of the observation squared.
								<BlockMath math={`w=\\frac{1}{\\sigma^2}`} />
							</ListItem>
						</UnorderedList>
					</Box>
				</VStack>
			}
		/>
	);
}

export function BenchmarkHelp() {
	return (
		<HelpButton
			modalTitle={'Benchmark'}
			modalContent={
				<VStack
					spacing={4}
					align={'start'}
				>
					<Text fontSize="md">
						Level nets are established using one or more benchmarks&mdash;
						<strong>a station with a known or assumed elevation</strong>. The
						elevation of the benchmark is used to adjust the elevations of the
						other stations in the level net.
					</Text>
					<Heading
						as="h4"
						size="md"
					>
						Directions
					</Heading>
					<Text fontSize="md">
						Enter the name of station that is the benchmark, along with the
						elevation of the benchmark.
					</Text>
					<Heading
						as="h4"
						size="md"
					>
						Fields
					</Heading>
					<Box ml={4}>
						<UnorderedList>
							<ListItem>
								<strong>Station</strong> &mdash; The alphanumeric name (or code)
								of the station used as a benchmark.
							</ListItem>
							<ListItem>
								<strong>Elevation</strong> &mdash; The known or assumed
								elevation of the benchmark.
							</ListItem>
						</UnorderedList>
					</Box>
				</VStack>
			}
		/>
	);
}

export function ObservationHelp() {
	return (
		<HelpButton
			modalTitle={'Observations'}
			modalContent={
				<VStack
					spacing={4}
					align={'start'}
				>
					<Text fontSize="md">
						Level nets are defined by a series of observations between two
						stations. Each observation is a measurement of the{' '}
						<strong>difference in elevation</strong>.
					</Text>
					<Heading
						as="h4"
						size="md"
					>
						Directions
					</Heading>
					<Text fontSize="md">Enter the details of each observation.</Text>
					<Heading
						as="h4"
						size="md"
					>
						Fields
					</Heading>
					<Box ml={4}>
						<UnorderedList>
							<ListItem>
								<strong>From</strong> &mdash; The name of the station from which
								the observation was made.
							</ListItem>
							<ListItem>
								<strong>To</strong> &mdash; The name of the station to which the
								observation was made.
							</ListItem>
							<ListItem>
								<strong>Δ Elevation</strong> &mdash; The difference in elevation
								between the two stations.
							</ListItem>
							<ListItem>
								<strong>Weight</strong>* &mdash; The weight of the observation,
								as determined by the weighting scheme.
							</ListItem>
						</UnorderedList>
						<Text
							fontSize="sm"
							mt={8}
						>
							*The weight is only definable when the weighting scheme is not set
							to &ldquo;Unweighted&rdquo;.
						</Text>
					</Box>
				</VStack>
			}
		/>
	);
}
