import { HistogramData } from './histogram-data';
import { HistogramResult } from './histogram-result';

export function HistogramComp(data: HistogramData): HistogramResult {
	const bucketRanges: { min: number; max: number }[] = [];
	const bucketFrequencies: number[] = [];

	const mean = data.values.reduce((a, b) => a + b, 0) / data.values.length;
	const stddev = Math.sqrt(
		data.values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) /
		data.values.length
	);
	const min = Math.min(...data.values);
	const max = Math.max(...data.values);

	let center;
	let one = false;
	switch (data.bucket.type) {
		case 'count':
			let bucketSize = (max - min) / data.bucket.value;
			for (let i = 0; i < data.bucket.value; i++) {
				bucketRanges.push({
					min: min + i * bucketSize,
					max: min + (i + 1) * bucketSize,
				});
			}
			break;
		case 'width':
			center = mean;
			while (center + data.bucket.value / 2 < max || !one) {
				bucketRanges.push({
					min: center - data.bucket.value / 2,
					max: center + data.bucket.value / 2,
				});
				center += data.bucket.value;
				one = true;
			}
			center = mean - data.bucket.value;
			while (center - data.bucket.value / 2 > min) {
				bucketRanges.unshift({
					min: center - data.bucket.value / 2,
					max: center + data.bucket.value / 2,
				});
				center -= data.bucket.value;
			}
			break;
		case 'stddev':
			center = mean;
			while (center + (data.bucket.value * stddev) / 2 < max || !one) {
				bucketRanges.push({
					min: center - (data.bucket.value * stddev) / 2,
					max: center + (data.bucket.value * stddev) / 2,
				});
				center += data.bucket.value * stddev;
				one = true;
			}
			center = mean - data.bucket.value * stddev;
			while (center - (data.bucket.value * stddev) / 2 > min) {
				bucketRanges.unshift({
					min: center - (data.bucket.value * stddev) / 2,
					max: center + (data.bucket.value * stddev) / 2,
				});
				center -= data.bucket.value * stddev;
			}
			break;
	}

	for (let i = 0; i < bucketRanges.length; i++) {
		if (i === bucketRanges.length - 1) {
			bucketFrequencies.push(
				data.values.filter(
					value => value >= bucketRanges[i].min && value <= bucketRanges[i].max
				).length
			);
		} else {
			bucketFrequencies.push(
				data.values.filter(
					value => value >= bucketRanges[i].min && value < bucketRanges[i].max
				).length
			);
		}
	}

	return {
		binValues: bucketRanges.map((range, i) => ({
			range,
			value: bucketFrequencies[i],
		})),
	};
}