import { GeocentricInverseData } from '../../../operation/coordinate-computations/geocentric-inverse/geocentric-inverse-data';
import GeocentricInverseComp from '../../../operation/coordinate-computations/geocentric-inverse/geocentric-inverse-comp';
import { DMSToRadians } from '../../../utils/angle';

describe('geocentric inverse', function () {
	it('should work with an example given by ghilani', function () {
		const data: GeocentricInverseData = {
			ellipsoid: 'WGS84',
			x: 1241581.343,
			y: -4638917.074,
			z: 4183965.568,
		};

		const result = GeocentricInverseComp(data);

		expect(result.latitude).toBeCloseTo(DMSToRadians(41, 15, 18.2106), 10);
		expect(result.longitude).toBeCloseTo(-DMSToRadians(75, 0, 58.61268), 10);
		expect(result.height).toBeCloseTo(312.391, 3);
	});
	it('should work with an arbitrary value', function () {
		const data: GeocentricInverseData = {
			ellipsoid: 'WGS84',
			x: 784594.21137,
			y: -4449654.8867,
			z: 4488055.51554,
		};

		const result = GeocentricInverseComp(data);

		expect(result.latitude).toBeCloseTo(DMSToRadians(45, 0, 0), 10);
		expect(result.longitude).toBeCloseTo(-DMSToRadians(80, 0, 0), 10);
		expect(result.height).toBeCloseTo(1000.0, 3);
	});
	it('should work with a random value', function () {
		const data: GeocentricInverseData = {
			ellipsoid: 'GRS80',
			x: 90219.8388,
			y: -6225701.62313,
			z: 1378839.54012,
		};

		const result = GeocentricInverseComp(data);

		expect(result.latitude).toBeCloseTo(DMSToRadians(12, 34, 5.67), 10);
		expect(result.longitude).toBeCloseTo(-DMSToRadians(89, 10, 11.12), 10);
		expect(result.height).toBeCloseTo(69, 3);
	});
});
