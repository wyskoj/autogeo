import {
	SpcsForwardsData,
	SpcsForwardsDataSchema
} from '../../../operation/coordinate-computations/spcs-forwards/spcs-forwards-data';
import { DMSToRadians } from '../../../utils/angle';
import { SpcsForwardsComp } from '../../../operation/coordinate-computations/spcs-forwards/spcs-forwards-comp';

describe('spcs forwards', function () {
	it('pa-north', function () {
		const data: SpcsForwardsData = {
			ellipsoid: 'GRS80',
			latitude: DMSToRadians(41, 18, 20.2541),
			longitude: -DMSToRadians(76, 0, 57.00239),
			zone: 'PA-North',
		};
		const result = SpcsForwardsComp(data);
		expect(result.northing).toBeCloseTo(127939.3996, 4);
		expect(result.easting).toBeCloseTo(745212.637, 4);
		expect(result.scaleFactor).toBeCloseTo(0.9999587349, 10);
		expect(result.convergenceAngle).toBeCloseTo(DMSToRadians(1,8,49.9910), 5);
	});
	it('nj-2900', function () {
		const data: SpcsForwardsData = {
			ellipsoid: 'GRS80',
			latitude: DMSToRadians(39, 2, 21.63632),
			longitude: -DMSToRadians(74, 46, 8.80133),
			zone: 'NJ/NY East-2900',
		};
		const result = SpcsForwardsComp(data);
		expect(result.northing).toBeCloseTo(22902.2324, 4);
		expect(result.easting).toBeCloseTo(126703.0680, 4);
		expect(result.scaleFactor).toBeCloseTo(0.9999066808, 9);
		expect(result.convergenceAngle).toBeCloseTo(-DMSToRadians(0,10,10.2), 5);
	});
});
