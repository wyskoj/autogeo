import { DirectionDirectionIntersectionData } from '../../../operation/coordinate-geometry/direction-direction-intersection/direction-direction-intersection-data';
import { DMSToRadians } from '../../../utils/angle';
import { DirectionDirectionIntersectionComp } from '../../../operation/coordinate-geometry/direction-direction-intersection/direction-direction-intersection-comp';

describe('direction-direction intersection', function () {
	it('should work 1', function () {
		// ghilani 11.2
		const data: DirectionDirectionIntersectionData = {
			azimuth1: DMSToRadians(76, 4, 24),
			azimuth2: DMSToRadians(141, 30, 16),
			station1: { station: 'A', x: 1425.07, y: 1971.28 },
			station2: { station: 'B', x: 7484.8, y: 5209.64 },
		};
		const result = DirectionDirectionIntersectionComp(data);

		expect(result.solution.x).toBeCloseTo(8637.85, 2);
		expect(result.solution.y).toBeCloseTo(3759.83, 2);
	});
});
