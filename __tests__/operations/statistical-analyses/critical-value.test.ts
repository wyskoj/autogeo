import { CriticalValueComp } from '../../../operation/statistical-analyses/critical-value/critical-value-comp';
import { CriticalValueData } from '../../../operation/statistical-analyses/critical-value/critical-value-data';

describe('critical value', function() {
	it('should work with normal distribution 1', function() {
		const data: CriticalValueData = {
			type: 'normal',
			probability: 0.5
		};
		const result = CriticalValueComp(data);
		expect(result.value).toBeCloseTo(0.674, 3);
	});
	it('should work with normal distribution 2', function() {
		const data: CriticalValueData = {
			type: 'normal',
			probability: 0.999999
		};
		const result = CriticalValueComp(data);
		expect(result.value).toBeCloseTo(4.892, 3);
	});
	it('should work with normal distribution 2', function() {
		const data: CriticalValueData = {
			type: 'normal',
			probability: 0.7
		};
		const result = CriticalValueComp(data);
		expect(result.value).toBeCloseTo(1.03643, 3);
	});
});