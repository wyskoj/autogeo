import { DistanceDistanceIntersectionComp } from '../../../operation/coordinate-geometry/distance-distance-intersection/distance-distance-intersection-comp';

describe('distance-distance intersection', function () {
	it('should work with an example given by ghilani', function () {
		// Oracle: Elementary Surveying, Ghilani 11.4
		const data = {
			station1: {
				station: 'A',
				x: 2851.28,
				y: 299.4,
			},
			station2: {
				station: 'B',
				x: 3898.72,
				y: 2870.15,
			},
			distance1: 2000,
			distance2: 1500,
		};

		const result = DistanceDistanceIntersectionComp(data);

		expect(result.solution1.x).toBeCloseTo(4464.85, 2);
		expect(result.solution1.y).toBeCloseTo(1481.09, 2);

		expect(result.solution2.x).toBeCloseTo(2523.02, 2);
		expect(result.solution2.y).toBeCloseTo(2272.28, 2);
	});
	it('should work with random values', function () {
		const data = {
			station1: {
				station: 'A',
				x: 4192.56,
				y: 6847.32,
			},
			station2: {
				station: 'B',
				x: 2398.13,
				y: 2251.76,
			},
			distance1: 2000,
			distance2: 5000,
		};

		const result = DistanceDistanceIntersectionComp(data);

		expect(result.solution1.x).toBeCloseTo(2233.321, 3);
		expect(result.solution1.y).toBeCloseTo(7249.043, 3);

		expect(result.solution2.x).toBeCloseTo(5905.617, 3);
		expect(result.solution2.y).toBeCloseTo(5815.12, 3);
	});
	it('should error when there is no solution', function () {
		const data = {
			station1: {
				station: 'A',
				x: 4192.56,
				y: 6847.32,
			},
			station2: {
				station: 'B',
				x: 2398.13,
				y: 2251.76,
			},
			distance1: 500,
			distance2: 500,
		};

		expect(() => DistanceDistanceIntersectionComp(data)).toThrow();
	});
});
