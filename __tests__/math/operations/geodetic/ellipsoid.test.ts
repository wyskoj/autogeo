import { eccentricity } from '../../../../comps/operations/geodetic/ellipsoids';

describe('ellipsoid', function () {
	it('eccentricity', function () {
		expect(eccentricity('GRS80')).toBeCloseTo(0.081819191, 9);
	});
});
