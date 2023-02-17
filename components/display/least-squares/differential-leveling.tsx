import {
	Badge,
	Box,
	Flex,
	Heading,
	HStack,
	Show,
	StackDivider,
	Text,
	VStack,
} from '@chakra-ui/react';
import DataDisplayTable from '../../data-display-table';
import {
	DifferentialLevelingData,
	DifferentialLevelingObservationResidualSchema,
	DifferentialLevelingObservationSchema,
	DifferentialLevelingResults,
	StationElevationSchema,
} from '../../../types/operation/least-squares/differential-leveling';
import {
	InterpretRefStdDev,
	InterpretRefStdDevSymbol,
} from '../../../comps/operations/least-squares/differential-leveling';

export default function DifferentialLevelingDisplay(props: {
	data: DifferentialLevelingData;
	results: DifferentialLevelingResults;
}) {
	return (
		<>
			<Show above="md">
				<HStack
					divider={<StackDivider />}
					spacing={4}
					align={'start'}
					width={'100%'}
				>
					<Data data={props.data} />
					<Results results={props.results} />
				</HStack>
			</Show>
			<Show below="md">
				<VStack
					divider={<StackDivider />}
					spacing={4}
					width={'100%'}
				>
					<Data data={props.data} />
					<Results results={props.results} />
				</VStack>
			</Show>
		</>
	);
}

function Data(props: { data: DifferentialLevelingData }) {
	return (
		<VStack
			flex="1"
			spacing={4}
		>
			<Heading
				as="h4"
				size="md"
			>
				Data
			</Heading>
			<VStack
				width={'100%'}
				align={'start'}
				spacing={1}
			>
				<Heading
					as="h5"
					size="sm"
				>
					Weighting scheme
				</Heading>
				<Text fontSize="md">
					<Badge>{props.data.weightingScheme}</Badge>
				</Text>
			</VStack>
			<Box width={'100%'}>
				<Heading
					as="h5"
					size="sm"
				>
					Benchmarks
				</Heading>
				<DataDisplayTable
					rows={props.data.benchmarks}
					schema={StationElevationSchema}
				/>
			</Box>
			<Box width={'100%'}>
				<Heading
					as="h5"
					size="sm"
				>
					Observations
				</Heading>
				<DataDisplayTable
					rows={props.data.observations}
					schema={DifferentialLevelingObservationSchema}
					customNames={{
						from: 'From',
						to: 'To',
						deltaElevation: 'Δ Elevation',
						weight: 'Weight',
					}}
				/>
			</Box>
		</VStack>
	);
}

function Results(props: { results: DifferentialLevelingResults }) {
	return (
		<VStack
			flex="1"
			spacing={4}
		>
			<Heading
				as="h4"
				size="md"
			>
				Results
			</Heading>
			<Box width={'100%'}>
				<Heading
					as="h5"
					size="sm"
				>
					Adjusted elevations
				</Heading>
				<DataDisplayTable
					rows={props.results.adjustedStations}
					schema={StationElevationSchema}
				/>
			</Box>
			<Box width={'100%'}>
				<Heading
					as="h5"
					size="sm"
				>
					Residuals
				</Heading>
				<DataDisplayTable
					rows={props.results.residuals}
					schema={DifferentialLevelingObservationResidualSchema}
				/>
			</Box>
			<VStack
				width={'100%'}
				align={'start'}
				spacing={1}
			>
				<Heading
					as="h5"
					size="sm"
				>
					Reference standard deviation
				</Heading>
				<Flex align={'center'}>
					<Badge
						colorScheme={InterpretRefStdDev(props.results.referenceStdDev)}
					>
						{Number(props.results.referenceStdDev).toFixed(3)}
					</Badge>
					<InterpretRefStdDevSymbol refStdDev={props.results.referenceStdDev} />
				</Flex>
			</VStack>
		</VStack>
	);
}
