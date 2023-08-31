import { PointToLineData } from '../../../operation/coordinate-geometry/point-to-line/point-to-line-data';
import { PointToLineComp } from '../../../operation/coordinate-geometry/point-to-line/point-to-line-comp';
import { toRadians } from 'chart.js/helpers';

describe('point to line intersection', () => {
	it('should work with ghilani example 11.1', () => {
		const data: PointToLineData = {
			point: {
				x: 1123.82, y: 509.41, station: 'P'
			},
			station1: {
				x: 865.49, y: 416.73, station: 'A'
			},
			station2: {
				x: 1557.41, y: 669.09, station: 'B'
			}
		};

		const result = PointToLineComp(data);
		expect(result.distance).toBeCloseTo(1.45, 2);
		expect(result.azimuth).toBeCloseTo(5.933453809, 4);
	});
	it('should work with a simple example 1', () => {
		const data: PointToLineData = {
			point: { x: 0, y: 1, station: 'P' },
			station1: { x: 0, y: 0, station: 'A' },
			station2: { x: 1, y: 1, station: 'B' }
		};

		const result = PointToLineComp(data);
		expect(result.distance).toBeCloseTo(Math.SQRT2 / 2, 5);
		expect(result.azimuth).toBeCloseTo(toRadians(135));
	});
	it('should work with a simple example 2', () => {
		const data: PointToLineData = {
			point: { x: 1, y: 0, station: 'P' },
			station1: { x: 0, y: 0, station: 'A' },
			station2: { x: 1, y: 1, station: 'B' }
		};

		const result = PointToLineComp(data);
		expect(result.distance).toBeCloseTo(Math.SQRT2 / 2, 5);
		expect(result.azimuth).toBeCloseTo(toRadians(315));
	});
});