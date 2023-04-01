import {
	DifferentialLevelingData,
	DifferentialLevelingObservationSchema,
} from './differential-leveling-data';
import {
	DifferentialLevelingObservationResidualSchema,
	DifferentialLevelingResult,
} from './differential-leveling-result';
import { DataResult } from '../../../components/display/display-common';
import DataDisplayTable from '../../../components/data-display-table';
import { StationElevationSchema } from '../../misc/station-elevation';
import { Badge, Flex } from '@chakra-ui/react';
import {
	InterpretRefStdDev,
	InterpretRefStdDevSymbol,
} from '../../../comps/operations/least-squares/differential-leveling';

export default function DifferentialLevelingDisplay(props: {
	data: DifferentialLevelingData;
	result: DifferentialLevelingResult;
}) {
	console.log('props', props);
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
