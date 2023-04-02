import { DMSToRadians } from '../../../utils/angle';
import GeocentricForwardsComp
	from '../../../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-comp';
import {
	GeocentricForwardsData
} from '../../../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-data';

describe('geocentric forward', function () {
	it('should work with GRS80 (1)', () => {
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
	it('should work with GRS80 (2)', () => {
		const data: GeocentricForwardsData = {
			ellipsoid: 'GRS80',
			latitude: DMSToRadians(47, 0, 0),
			longitude: DMSToRadians(360 - 88, 0, 0), // 88 degrees west
			height: 0,
		};
		const result = GeocentricForwardsComp(data);
		expect(result.X).toBeCloseTo(152081.10784, 5);
		expect(result.Y).toBeCloseTo(-4355033.12371, 5);
		expect(result.Z).toBeCloseTo(4641764.78871, 5);
	});
	it('should work with WGS84 (1)', () => {
		const data: GeocentricForwardsData = {
			ellipsoid: 'WGS84',
			latitude: DMSToRadians(-20, 0, 0),
			longitude: DMSToRadians(20, 0, 0),
			height: 0,
		};
		const result = GeocentricForwardsComp(data);
		expect(result.X).toBeCloseTo(5634243.20539, 5);
		expect(result.Y).toBeCloseTo(2050696.81938, 5);
		expect(result.Z).toBeCloseTo(-2167696.78783, 5);
	});
	it('should work with WGS84 (2)', () => {
		const data: GeocentricForwardsData = {
			ellipsoid: 'WGS84',
			latitude: DMSToRadians(0, 0, 0),
			longitude: DMSToRadians(0, 0, 0),
			height: 0,
		};
		const result = GeocentricForwardsComp(data);
		expect(result.X).toBeCloseTo(6378137.00000, 5);
		expect(result.Y).toBeCloseTo(0, 5);
		expect(result.Z).toBeCloseTo(0, 5);
	});
});
