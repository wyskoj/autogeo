import { DirectionDirectionIntersectionData } from '../../../operation/coordinate-geometry/direction-direction-intersection/direction-direction-intersection-data';
import { DMSToRadians } from '../../../utils/angle';
import { DirectionDirectionIntersectionComp } from '../../../operation/coordinate-geometry/direction-direction-intersection/direction-direction-intersection-comp';

describe('direction-direction intersection', function () {
	it('should work with an example given by ghilani', function () {
		// Oracle: Elementary Surveying, Ghilani 11.2
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
	it('should work with random values', function () {
		const data: DirectionDirectionIntersectionData = {
			azimuth1: DMSToRadians(23, 10, 45),
			azimuth2: DMSToRadians(155, 42, 36),
			station1: { station: 'C', x: 3245.87, y: 5682.91 },
			station2: { station: 'D', x: 1185.22, y: 2891.5 },
		};
		const result = DirectionDirectionIntersectionComp(data);

		expect(result.solution.x).toBeCloseTo(1629.33, 3);
		expect(result.solution.y).toBeCloseTo(1907.448, 3);
	});
	it('should error when there is no solution (equal azimuths)', function () {
		const data: DirectionDirectionIntersectionData = {
			azimuth1: DMSToRadians(23, 10, 45),
			azimuth2: DMSToRadians(23, 10, 45),
			station1: { station: 'C', x: 3245.87, y: 5682.91 },
			station2: { station: 'D', x: 1185.22, y: 2891.5 },
		};
		expect(() => DirectionDirectionIntersectionComp(data)).toThrow();
	});
	it('should error when there is no solution (reverse azimuths)', function () {
		const data: DirectionDirectionIntersectionData = {
			azimuth1: DMSToRadians(23, 10, 45),
			azimuth2: DMSToRadians(23 + 180, 10, 45),
			station1: { station: 'C', x: 3245.87, y: 5682.91 },
			station2: { station: 'D', x: 1185.22, y: 2891.5 },
		};
		expect(() => DirectionDirectionIntersectionComp(data)).toThrow();
	});
});
