import { DifferentialLevelingData } from '../../../../types/operation/least-squares/differential-leveling';
import AdjustDifferentialLeveling from '../../../../comps/operations/least-squares/differential-leveling';

describe('Least-squares / Differential Leveling', () => {
	it('should adjust an unweighted level net 1', () => {
		// Ghilani prob. 12.1
		const data: DifferentialLevelingData = {
			benchmarks: [
				{ station: 'BMA', elevation: 100.0 },
				{ station: 'BMB', elevation: 101.6 },
				{ station: 'BMC', elevation: 108.05 },
				{ station: 'BMD', elevation: 106.07 },
			],
			observations: [
				{
					from: 'BMA',
					to: 'Y',
					deltaElevation: 3.68,
					weight: 0,
				},
				{
					from: 'BMB',
					to: 'Y',
					deltaElevation: 2.06,
					weight: 0,
				},
				{
					from: 'Y',
					to: 'X',
					deltaElevation: 2.02,
					weight: 0,
				},
				{
					from: 'BMC',
					to: 'X',
					deltaElevation: -2.37,
					weight: 0,
				},
				{
					from: 'BMD',
					to: 'X',
					deltaElevation: -0.38,
					weight: 0,
				},
			],
			weightingScheme: 'unweighted',
		};

		const adjustmentResult = AdjustDifferentialLeveling(data);
		expect(
			adjustmentResult.adjustedStations.find(x => x.station === 'X')!!.elevation
		).toBeCloseTo(105.6863, 3);
		expect(
			adjustmentResult.adjustedStations.find(x => x.station === 'Y')!!.elevation
		).toBeCloseTo(103.6688, 3);

		const expectedResiduals = [-0.01125, 0.00875, -0.0025, 0.00625, -0.00375];

		adjustmentResult.residuals
			.map(it => it.residual)
			.forEach((it, i) => {
				expect(it).toBeCloseTo(expectedResiduals[i]);
			});

		expect(adjustmentResult.referenceStdDev).toBeCloseTo(0.0094, 4);
	});
	it('should adjust an unweighted level net 2', () => {
		// Ghilani fig. 12.2
		const data: DifferentialLevelingData = {
			benchmarks: [
				{ station: 'BMX', elevation: 100.0 },
				{ station: 'BMY', elevation: 107.5 },
			],
			observations: [
				{ from: 'BMX', to: 'A', deltaElevation: 5.1, weight: 0 },
				{ from: 'A', to: 'BMY', deltaElevation: 2.34, weight: 0 },
				{ from: 'BMY', to: 'C', deltaElevation: -1.25, weight: 0 },
				{ from: 'C', to: 'BMX', deltaElevation: -6.13, weight: 0 },
				{ from: 'A', to: 'B', deltaElevation: -0.68, weight: 0 },
				{ from: 'BMY', to: 'B', deltaElevation: -3.0, weight: 0 },
				{ from: 'B', to: 'C', deltaElevation: 1.7, weight: 0 },
			],
			weightingScheme: 'unweighted',
		};

		const adjustmentResult = AdjustDifferentialLeveling(data);
		expect(
			adjustmentResult.adjustedStations.find(x => x.station === 'A')!!.elevation
		).toBeCloseTo(105.141, 3);
		expect(
			adjustmentResult.adjustedStations.find(x => x.station === 'B')!!.elevation
		).toBeCloseTo(104.483, 3);
		expect(
			adjustmentResult.adjustedStations.find(x => x.station === 'C')!!.elevation
		).toBeCloseTo(106.188, 3);

		const expectedResiduals = [
			0.041, 0.019, -0.062, -0.058, 0.022, -0.017, 0.005,
		];

		adjustmentResult.residuals
			.map(it => it.residual)
			.forEach((it, i) => {
				expect(it).toBeCloseTo(expectedResiduals[i], 3);
			});

		expect(adjustmentResult.referenceStdDev).toBeCloseTo(0.050119, 5);
	});
	it('should adjust an unweighted level net 3', () => {
		const data: DifferentialLevelingData = {
			benchmarks: [
				{ station: 'BMA', elevation: 100.0 },
				{ station: 'BMB', elevation: 105.0 },
			],
			observations: [
				{ from: 'BMA', to: 'X', deltaElevation: 2.5, weight: 0 },
				{ from: 'X', to: 'BMB', deltaElevation: 2.6, weight: 0 },
			],
			weightingScheme: 'unweighted',
		};

		const adjustmentResult = AdjustDifferentialLeveling(data);

		expect(adjustmentResult.adjustedStations).toEqual([
			{ station: 'X', elevation: 102.45 },
		]);
	});
	it('should adjust a weighted level using normal weights', () => {
		// Ghilani fig. 12.2
		const data: DifferentialLevelingData = {
			benchmarks: [
				{ station: 'BMX', elevation: 100.0 },
				{ station: 'BMY', elevation: 107.5 },
			],
			observations: [
				{ from: 'BMX', to: 'A', deltaElevation: 5.1, weight: 3 },
				{ from: 'A', to: 'BMY', deltaElevation: 2.34, weight: 4 },
				{ from: 'BMY', to: 'C', deltaElevation: -1.25, weight: 6 },
				{ from: 'C', to: 'BMX', deltaElevation: -6.13, weight: 4 },
				{ from: 'A', to: 'B', deltaElevation: -0.68, weight: 6 },
				{ from: 'BMY', to: 'B', deltaElevation: -3.0, weight: 6 },
				{ from: 'B', to: 'C', deltaElevation: 1.7, weight: 6 },
			],
			weightingScheme: 'normal',
		};

		const adjustmentResult = AdjustDifferentialLeveling(data);

		expect(
			adjustmentResult.adjustedStations.find(x => x.station === 'A')!!.elevation
		).toBeCloseTo(105.15, 3);
		expect(
			adjustmentResult.adjustedStations.find(x => x.station === 'B')!!.elevation
		).toBeCloseTo(104.489, 3);
		expect(
			adjustmentResult.adjustedStations.find(x => x.station === 'C')!!.elevation
		).toBeCloseTo(106.197, 3);

		const expectedResiduals = [
			0.05, 0.01, -0.053, -0.067, 0.019, -0.011, 0.008,
		];

		adjustmentResult.residuals
			.map(it => it.residual)
			.forEach((it, i) => {
				expect(it).toBeCloseTo(expectedResiduals[i], 3);
			});
	});

	it('should adjust a weighted level using stddev weights', () => {
		const data: DifferentialLevelingData = {
			benchmarks: [{ station: 'A', elevation: 437.596 }],
			observations: [
				{ from: 'A', to: 'B', deltaElevation: 10.509, weight: 0.006 },
				{ from: 'B', to: 'C', deltaElevation: 5.36, weight: 0.004 },
				{ from: 'C', to: 'D', deltaElevation: -8.523, weight: 0.005 },
				{ from: 'D', to: 'A', deltaElevation: -7.348, weight: 0.003 },
				{ from: 'B', to: 'D', deltaElevation: -3.167, weight: 0.004 },
				{ from: 'A', to: 'C', deltaElevation: 15.881, weight: 0.012 },
			],
			weightingScheme: 'stddev',
		};

		const adjustmentResult = AdjustDifferentialLeveling(data);

		expect(
			adjustmentResult.adjustedStations.find(x => x.station === 'B')!!.elevation
		).toBeCloseTo(448.109, 3);

		expect(
			adjustmentResult.adjustedStations.find(x => x.station === 'C')!!.elevation
		).toBeCloseTo(453.468, 3);

		expect(
			adjustmentResult.adjustedStations.find(x => x.station === 'D')!!.elevation
		).toBeCloseTo(444.944, 3);

		const expectedResiduals = [0.004, 0.0, -0.002, 0.0, 0.002, -0.009];

		adjustmentResult.residuals
			.map(it => it.residual)
			.forEach((it, i) => {
				expect(it).toBeCloseTo(expectedResiduals[i], 3);
			});
	});
});
