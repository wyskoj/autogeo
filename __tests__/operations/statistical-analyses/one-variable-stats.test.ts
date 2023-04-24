import {
	OneVariableStatsComp
} from '../../../operation/statistical-analyses/one-variable-stats/one-variable-stats-comp';

describe('one-variable statistics', function () {
	it('should work with data from homework 1', function () {
		const data: number[] = [32.6, 31.2, 27.7, 33.1, 32, 18.4, 17.7, 31.2, 35.0, 20.7];
		const result = OneVariableStatsComp({ values: data });

		expect(result.mean).toBeCloseTo(27.96, 2);
		expect(result.median).toBeCloseTo(31.2, 2);
		expect(result.mode).toBeCloseTo(31.2, 2);
		expect(result.variance).toBeCloseTo(42.7, 2);
		expect(result.standardDeviation).toBeCloseTo(6.53, 2);
		expect(result.standardDeviationOfMean).toBeCloseTo(2.07, 2);

		const expectedResiduals = [-4.64, -3.24, 0.26, -5.14, -4.04, 9.56, 10.26, -3.24, -7.04, 7.26];
		for (let i = 0; i < expectedResiduals.length; i++) {
			expect(result.residuals[i]).toBeCloseTo(expectedResiduals[i], 2);
		}
	});
});