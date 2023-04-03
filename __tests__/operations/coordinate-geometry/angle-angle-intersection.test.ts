import { AngleAngleIntersectionData } from '../../../operation/coordinate-geometry/angle-angle-intersection/angle-angle-intersection-data';
import { DMSToRadians } from '../../../utils/angle';
import { AngleAngleIntersectionComp } from '../../../operation/coordinate-geometry/angle-angle-intersection/angle-angle-intersection-comp';

describe('angle-angle intersection', function () {
	it('should work 1', function () {
		const data: AngleAngleIntersectionData = {
			occupiedStation1: {
				x: 0,
				y: 0,
				station: 'O1',
			},
			backsightStation1: {
				x: 0,
				y: 1,
				station: 'B1',
			},
			angleFromStation1: DMSToRadians(20, 0, 0),
			occupiedStation2: {
				x: 1,
				y: 0,
				station: 'O2',
			},
			backsightStation2: {
				x: 1,
				y: 1,
				station: 'B2',
			},
			angleFromStation2: DMSToRadians(360 - 20, 0, 0),
		};
		const result = AngleAngleIntersectionComp(data);

		expect(result.solution.x).toBeCloseTo(0.5, 3);
		expect(result.solution.y).toBeCloseTo(1.374, 3);
	});
	it('should work 2', function () {
		// random data, oracle: adjust
		const data: AngleAngleIntersectionData = {
			occupiedStation1: {
				x: 305.2754598705,
				y: 874.5328123684,
				station: 'O1',
			},
			backsightStation1: {
				x: 360.1984807205,
				y: 903.4483790023,
				station: 'B1',
			},
			angleFromStation1: DMSToRadians(156, 15, 22.0),
			occupiedStation2: {
				x: 452.0978551706,
				y: 745.530494932,
				station: 'O2',
			},
			backsightStation2: {
				x: 504.2584010458,
				y: 866.2762132963,
				station: 'B2',
			},
			angleFromStation2: DMSToRadians(178, 13, 27),
		};
		const result = AngleAngleIntersectionComp(data);
		expect(result.solution.x).toBeCloseTo(699.127, 3);
		expect(result.solution.y).toBeCloseTo(1369.842, 3);
	});
	it('should error when there is no solution', function () {
		const data: AngleAngleIntersectionData = {
			occupiedStation1: {
				x: 0,
				y: 0,
				station: 'O1',
			},
			backsightStation1: {
				x: 0,
				y: 1,
				station: 'B1',
			},
			angleFromStation1: DMSToRadians(20, 0, 0),
			occupiedStation2: {
				x: 1,
				y: 0,
				station: 'O2',
			},
			backsightStation2: {
				x: 1,
				y: 1,
				station: 'B2',
			},
			angleFromStation2: DMSToRadians(20, 0, 0),
		};
		expect(() => AngleAngleIntersectionComp(data)).toThrow();
	});
});
