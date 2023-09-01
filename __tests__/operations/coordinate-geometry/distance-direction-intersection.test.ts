import {
	DistanceDirectionIntersectionData
} from '../../../operation/coordinate-geometry/distance-direction-intersection/distance-direction-intersection-data';
import { DMSToRadians } from '../../../utils/angle';
import {
	DistanceDirectionIntersectionComp
} from '../../../operation/coordinate-geometry/distance-direction-intersection/distance-direction-intersection-comp';

describe('distance direction intersection', () => {
	it('should work with ghilani 11.3', () => {
		const data = {
			point1: {x:100,y:130,station:"A"},
			point2: {x:500,y:600,station:"B"},
			distance: 350,
			azimuth: DMSToRadians(70,42,36)
		} satisfies DistanceDirectionIntersectionData;

		const result = DistanceDirectionIntersectionComp(data);

		expect(result.solution1.x).toBeCloseTo(753.57, 2)
		expect(result.solution1.y).toBeCloseTo(358.75, 2)

		expect(result.solution2.x).toBeCloseTo(452.22, 2)
		expect(result.solution2.y).toBeCloseTo(253.28, 2)
	});
});