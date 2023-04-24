import { OneVariableStatsResult } from './one-variable-stats-result';
import { OneVariableStatsData } from './one-variable-stats-data';
import { DataResult } from '../../../components/display/display-common';
import { Box, Button, VStack } from '@chakra-ui/react';
import { MdWrapText } from 'react-icons/md';
import { useState } from 'react';

export function OneVariableStatsDisplay(props: {
	data: OneVariableStatsData;
	result: OneVariableStatsResult;
}) {
	const [wrap, setWrap] = useState(false);
	return (
		<VStack w='100%'>

			<DataResult
				data={[
					{
						label: 'Values',
						value: props.data.values.join(wrap ? ', ' : '\n'),
						condensed: true
					}
				]}
				result={[
					{
						label: 'Mean',
						value: props.result.mean
					},
					{
						label: 'Median',
						value: props.result.median
					},
					{
						label: 'Mode',
						value: props.result.mode
					},
					{
						label: 'Standard deviation',
						value: isNaN(props.result.standardDeviation) ? '----' : props.result.standardDeviation
					},
					{
						label: 'Standard deviation of the mean',
						value: isNaN(props.result.standardDeviationOfMean) ? '----' : props.result.standardDeviationOfMean
					},
					{
						label: 'Variance',
						value: isNaN(props.result.variance) ? '----' : props.result.variance
					},
					{
						label: 'Residuals',
						value: props.result.residuals.join(wrap ? ', ' : '\n'),
						condensed: true
					}
				]}
			/>
			<Button leftIcon={<MdWrapText />} onClick={() => {
				setWrap(!wrap);
			}}>Switch wrap style</Button>
		</VStack>
	);
}