import { DistanceDistanceIntersectionComp } from '../../../operation/coordinate-geometry/distance-distance-intersection/distance-distance-intersection-comp';

describe('distance-distance intersection', function () {
	it('should work 1', function () {
		// elementary ghilani 11.4
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
});
