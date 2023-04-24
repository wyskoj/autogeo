import { SpcsInverseData } from '../../../operation/coordinate-computations/spcs-inverse/spcs-inverse-data';
import { SpcsInverseComp } from '../../../operation/coordinate-computations/spcs-inverse/spcs-inverse-comp';
import { DMSToRadians } from '../../../utils/angle';

describe('state plane inverse', function() {
	it('should work lcc 1', function() {
		const data: SpcsInverseData = {
			easting: 745212.637, ellipsoid: 'GRS80', northing: 127939.400, zone: 'PA-North'
		};
		const result = SpcsInverseComp(data);
		expect(result.latitude).toBeCloseTo(DMSToRadians(41,18,20.25411),10)
		expect(result.longitude).toBeCloseTo(-DMSToRadians(76,0,57.00239),10)
		expect(result.scaleFactor).toBeCloseTo(0.99995873,8)
		expect(result.convergenceAngle).toBeCloseTo(DMSToRadians(1,8,49.99),7)
	});
	it('should work lcc 2', function() {
		const data: SpcsInverseData = {
			easting: 3989084.888, ellipsoid: 'GRS80', northing: 138855.190, zone: 'MI-South'
		};
		const result = SpcsInverseComp(data);
		expect(result.latitude).toBeCloseTo(DMSToRadians(42,45,0),10)
		expect(result.longitude).toBeCloseTo(-DMSToRadians(84,30,0),10)
		expect(result.scaleFactor).toBeCloseTo(0.99990964,8)
		expect(result.convergenceAngle).toBeCloseTo(-DMSToRadians(0,5,26.65),7)
	});
	it('should work tm 1', function() {
		const data: SpcsInverseData = {
			easting: 126703.068, ellipsoid: 'GRS80', northing: 22902.232, zone: 'NJ/NY East-2900'
		};
		const result = SpcsInverseComp(data);
		expect(result.latitude).toBeCloseTo(DMSToRadians(39,2,21.63632),9)
		expect(result.longitude).toBeCloseTo(-DMSToRadians(74,46,8.80133),9)
		expect(result.scaleFactor).toBeCloseTo(0.99990668,8)
		expect(result.convergenceAngle).toBeCloseTo(-DMSToRadians(0,10,10.2),7)
	});
	it('should work tm 2', function() {
		const data: SpcsInverseData = {
			easting: 235951.262, ellipsoid: 'GRS80', northing: 392226.624, zone: 'FL-East'
		};
		const result = SpcsInverseComp(data);
		expect(result.latitude).toBeCloseTo(DMSToRadians(27,52,24.00853),9)
		expect(result.longitude).toBeCloseTo(-DMSToRadians(80,38,5.66134),9)
		expect(result.scaleFactor).toBeCloseTo(0.99995712,8)
		expect(result.convergenceAngle).toBeCloseTo(DMSToRadians(0,10,14.48),7)
	});
});
