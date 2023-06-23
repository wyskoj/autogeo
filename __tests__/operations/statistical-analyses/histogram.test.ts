import { HistogramComp } from '../../../operation/statistical-analyses/histogram/histogram-comp';
import { HistogramData } from '../../../operation/statistical-analyses/histogram/histogram-data';

describe('histogram', function () {
	it('should work with a count of buckets', function () {
		const values = [
			400.787, 400.796, 400.792, 400.787, 400.787, 400.786, 400.792, 400.794,
			400.79, 400.788, 400.797, 400.794, 400.789, 400.785, 400.791, 400.791,
			400.793, 400.791, 400.792, 400.787, 400.788, 400.79, 400.798, 400.789,
		];
		const data: HistogramData = {
			values: values,
			bucket: {
				type: 'count',
				value: 5,
			},
		};
		console.log(Math.min(...values));
		console.log(Math.max(...values));
		console.log(HistogramComp(data).binValues.map(it => it.value));
		console.log(HistogramComp(data).binValues.map(it => it.range));
	});
});