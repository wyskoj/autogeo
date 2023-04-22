import { VI } from '../../utils/mapping-table';

describe('mapping table', function() {
	it('should work', function() {
		let i = [];
		for (let j = 0; j < 1000; j++) {
			i.push(j);
		}
		let vi = i.map(VI);
		vi.forEach(
			(x, i) => expect(x).toBe(i * (i + 1) / 2),
		)
	});
});