import { RadiiData } from '../../../../types/operation/geodetic/radii';
import { Ellipsoids } from '../../../../comps/operations/geodetic/ellipsoids';
import { Radii } from '../../../../comps/operations/geodetic/radii';

describe('Geodetic / Radii', () => {
	it('should work with grs 80', () => {
		const data: RadiiData = {
			ellipsoid: Ellipsoids['GRS80'],
			latitude: 41 * (Math.PI / 180),
			azimuth: 0,
		};
		const result = Radii(data);
		expect(result.radiusPrimeVertical).toBeCloseTo(6387345.731, 3);
		expect(result.radiusMeridian).toBeCloseTo(6362920.219, 3);
		expect(result.radiusAzimuthal).toBeCloseTo(6362920.219, 3);
	});
	it('should work with grs 80 and an azimuth', () => {
		const data: RadiiData = {
			ellipsoid: Ellipsoids['GRS80'],
			latitude: 41 * (Math.PI / 180),
			azimuth: 10 * (Math.PI / 180),
		};
		const result = Radii(data);
		expect(result.radiusPrimeVertical).toBeCloseTo(6387345.731, 3);
		expect(result.radiusMeridian).toBeCloseTo(6362920.219, 3);
		expect(result.radiusAzimuthal).toBeCloseTo(6363654.007, 3);
	});
	it('should work with wgs 84', () => {
		const data: RadiiData = {
			ellipsoid: Ellipsoids['WGS84'],
			latitude: 80 * (Math.PI / 180),
			azimuth: 0,
		};
		const result = Radii(data);
		expect(result.radiusPrimeVertical).toBeCloseTo(6398943.46, 3);
		expect(result.radiusMeridian).toBeCloseTo(6397643.326, 3);
		expect(result.radiusAzimuthal).toBeCloseTo(6397643.326, 3);
	});
	it('should work with wgs 84 and an azimuth', () => {
		const data: RadiiData = {
			ellipsoid: Ellipsoids['WGS84'],
			latitude: 80 * (Math.PI / 180),
			azimuth: 30 * (Math.PI / 180),
		};
		const result = Radii(data);
		expect(result.radiusPrimeVertical).toBeCloseTo(6398943.46, 3);
		expect(result.radiusMeridian).toBeCloseTo(6397643.326, 3);
		expect(result.radiusAzimuthal).toBeCloseTo(6397968.31, 3);
	});
});
