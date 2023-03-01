import {
	groundSamplingDistance,
	reliefDistance,
	scaleDenominator,
	scaleDenominatorFlyingHeight,
} from '../../../../comps/operations/remote-sensing/image-scale';

describe('image-scale', () => {
	it('should work with image and ground distance', () => {
		const denominator = scaleDenominator(0.08333, 3000);
		expect(denominator).toBeCloseTo(36001.4401);
	});
	it('should work with flying height and focal length', () => {
		expect(scaleDenominatorFlyingHeight(0.15174, 29987)).toBeCloseTo(197621, 0);
	});
	it('should work with nadir', () => {
		expect(reliefDistance(2000, 150, 0.105)).toBeCloseTo(0.007875, 6);
	});
	it('should work with gsd', () => {
		expect(groundSamplingDistance(100, 1200)).toBeCloseTo(0.3048);
		expect(groundSamplingDistance(200, 1200)).toBeCloseTo(0.1524);
		expect(groundSamplingDistance(300, 1200)).toBeCloseTo(0.1);
		expect(groundSamplingDistance(600, 1200)).toBeCloseTo(0.05);
		expect(groundSamplingDistance(800, 1200)).toBeCloseTo(0.04);
	});
	it('should help me do my homework', () => {
		console.log(scaleDenominatorFlyingHeight(0.15042, 24389));
	});
});
