import { DMSToRadians } from '../../utils/angle';

describe('angle', function () {
	it('should work 1', () => {
		expect(DMSToRadians(45, 0, 0)).toBeCloseTo(0.7854, 4);
		expect(DMSToRadians(330, 0, 0)).toBeCloseTo(5.7596, 4);
	});
});
