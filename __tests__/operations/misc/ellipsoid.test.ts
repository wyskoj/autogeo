import { eccentricity } from '../../../operation/misc/ellipsoid/ellipsoid-comp';

describe('ellipsoid', function () {
	it('eccentricity', function () {
		expect(eccentricity('GRS80')).toBeCloseTo(0.081819191, 9);
	});
});
