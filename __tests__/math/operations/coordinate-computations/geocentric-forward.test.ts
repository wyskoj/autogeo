import { DMSToRadians } from '../../../../utils/angle';
import GeocentricForwardsComp
	from '../../../../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-comp';
import {
	GeocentricForwardsData
} from '../../../../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-data';

describe('geocentric forward', function () {
	it('should work 1', () => {
		const data: GeocentricForwardsData = {
			ellipsoid: 'GRS80',
			latitude: DMSToRadians(45, 0, 0),
			longitude: DMSToRadians(330, 0, 0), // 30 degrees west
			height: 0,
		};
		const result = GeocentricForwardsComp(data);
		expect(result.X).toBeCloseTo(3912348.46502, 5);
		expect(result.Y).toBeCloseTo(-2258795.43944, 5);
		expect(result.Z).toBeCloseTo(4487348.40875, 5);
	});
});
