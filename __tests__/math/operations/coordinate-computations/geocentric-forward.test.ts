import GeocentricForward from '../../../../comps/operations/coordinate-computations/geocentric-forward';
import { GeocentricForwardData } from '../../../../types/operation/coordinate-computations/geocentric-cartesian-coordinate';
import { dmsToRad } from '../../../../utils/angle';

describe('geocentric forward', function () {
	it('should work 1', () => {
		const data: GeocentricForwardData = {
			ellipsoid: 'GRS80',
			latitude: dmsToRad(45, 0, 0),
			longitude: dmsToRad(330, 0, 0), // 30 degrees west
			height: 0,
		};
		const result = GeocentricForward(data);
		expect(result.X).toBeCloseTo(3912348.46502, 5);
		expect(result.Y).toBeCloseTo(-2258795.43944, 5);
		expect(result.Z).toBeCloseTo(4487348.40875, 5);
	});
});
