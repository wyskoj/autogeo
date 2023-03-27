import { Badge, Flex } from '@chakra-ui/react';
import DataDisplayTable from '../../data-display-table';
import {
	DifferentialLevelingData,
	DifferentialLevelingObservationResidualSchema,
	DifferentialLevelingObservationSchema,
	DifferentialLevelingResult,
	StationElevationSchema,
} from '../../../types/operation/least-squares/differential-leveling';
import {
	InterpretRefStdDev,
	InterpretRefStdDevSymbol,
} from '../../../comps/operations/least-squares/differential-leveling';
import { DataResult } from '../display-common';

export default function DifferentialLevelingDisplay(props: {
	data: DifferentialLevelingData;
	result: DifferentialLevelingResult;
}) {
	return (
		<DataResult
			data={[
				{ label: 'Weighting scheme', value: props.data.weightingScheme },
				{
					label: 'Benchmarks',
					value: (
						<DataDisplayTable
							rows={props.data.benchmarks}
							schema={StationElevationSchema}
						/>
					),
				},
				{
					label: 'Observations',
					value: (
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
					),
				},
			]}
			result={[
				{
					label: 'Adjusted elevations',
					value: (
						<DataDisplayTable
							rows={props.result.adjustedStations}
							schema={StationElevationSchema}
						/>
					),
				},
				{
					label: 'Residuals',
					value: (
						<DataDisplayTable
							rows={props.result.residuals}
							schema={DifferentialLevelingObservationResidualSchema}
						/>
					),
				},
				{
					label: 'Reference standard deviation',
					value: (
						<Flex align={'center'}>
							<Badge
								fontSize={'lg'}
								p={1}
								mt={1}
								colorScheme={InterpretRefStdDev(props.result.referenceStdDev)}
							>
								{Number(props.result.referenceStdDev).toFixed(3)}
							</Badge>
							<InterpretRefStdDevSymbol
								refStdDev={props.result.referenceStdDev}
							/>
						</Flex>
					),
				},
			]}
		/>
	);
}
