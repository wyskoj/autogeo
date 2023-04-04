import { InverseAzimuth } from '../../../operation/misc/inverse-azimuth';
import { DMSToRadians } from '../../../utils/angle';

describe('inverse azimuth', function() {
	it('should work in quadrant 1', function() {
		const result = InverseAzimuth(
			{ x: 0, y: 0, station: 'A' },
			{ x: 100, y: 100, station: 'B' }
		);

		expect(result).toBeCloseTo(DMSToRadians(45, 0, 0));
	});
	it('should work in quadrant 2', function() {
		const result = InverseAzimuth(
			{ x: 0, y: 0, station: 'A' },
			{ x: 100, y: -100, station: 'B' }
		);

		expect(result).toBeCloseTo(DMSToRadians(135, 0, 0));
	});
	it('should work in quadrant 3', function() {
		const result = InverseAzimuth(
			{ x: 0, y: 0, station: 'A' },
			{ x: -100, y: -100, station: 'B' }
		);

		expect(result).toBeCloseTo(DMSToRadians(225, 0, 0));
	});
	it('should work in quadrant 4', function() {
		const result = InverseAzimuth(
			{ x: 0, y: 0, station: 'A' },
			{ x: -100, y: 100, station: 'B' }
		);

		expect(result).toBeCloseTo(DMSToRadians(315, 0, 0));
	});
	it('should work for due north', function() {
		const result = InverseAzimuth(
			{ x: 0, y: 0, station: 'A' },
			{ x: 0, y: 100, station: 'B' }
		);

		expect(result).toBeCloseTo(DMSToRadians(0, 0, 0));
	});
	it('should work for due south', function() {
		const result = InverseAzimuth(
			{ x: 0, y: 0, station: 'A' },
			{ x: 0, y: -100, station: 'B' }
		);

		expect(result).toBeCloseTo(DMSToRadians(180, 0, 0));
	});
	it('should work for due east', function() {
		const result = InverseAzimuth(
			{ x: 0, y: 0, station: 'A' },
			{ x: 100, y: 0, station: 'B' }
		);

		expect(result).toBeCloseTo(DMSToRadians(90, 0, 0));
	});
	it('should work for due west', function() {
		const result = InverseAzimuth(
			{ x: 0, y: 0, station: 'A' },
			{ x: -100, y: 0, station: 'B' }
		);

		expect(result).toBeCloseTo(DMSToRadians(270, 0, 0));
	});
});