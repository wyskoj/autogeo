import { HistogramData } from './histogram-data';
import { HistogramResult } from './histogram-result';
import { Bar } from 'react-chartjs-2';
import {
	BarElement,
	CategoryScale,
	Chart,
	Chart as ChartJS,
	LinearScale,
	Tooltip,
} from 'chart.js';
import { Box, Center } from '@chakra-ui/react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export function HistogramDisplay(props: {
	data: HistogramData;
	result: HistogramResult;
}) {
	const data = {
		datasets: [
			{
				label: 'Frequency',
				data: props.result.binValues.map(it => it.value),
				backgroundColor: '#4dff9c',
			},
		],
		labels: props.result.binValues.map(
			it => `${it.range.min.toFixed(3)} .. ${it.range.max.toFixed(3)}`
		),
	};

	return (
		<Center w={'90%'}>
			<Bar
				options={{
					responsive: true,
					plugins: { colors: { forceOverride: true } },
					animation: { duration: 0 },
				}}
				data={data}
			/>
		</Center>
	);
}
