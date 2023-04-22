import { AdjustLeastSquares } from '../../../operation/least-squares/least-squares';

describe('least-squares', function () {
	it('should should handle some stress testing', function () {
		const times: number[][] = [];
		for (let unknowns = 0; unknowns < 100; unknowns++) {
			times[unknowns] = [];
			for (let observations = unknowns; observations < 100; observations++) {
				const start = window.performance.now();
				const A = makeDummyMatrix(observations, unknowns);
				const L = makeDummyArray(observations);
				const W = makeDummyArray(observations);
				AdjustLeastSquares(
					unknowns,
					observations,
					(i, j) => {
						return A[i][j];
					},
					i => {
						return L[i];
					},
					i => {
						return W[i];
					}
				);
				const end = window.performance.now();
				times[unknowns][observations] = end - start;
			}
		}
		// write results to csv file
		const csv = times.map(row => row.join(',')).join('\n');
		const fs = require('fs');
		fs.writeFileSync('times.csv', csv);
	});
});

function makeDummyMatrix(h: number, w: number): number[][] {
	const m: number[][] = [];
	for (let i = 0; i < h; i++) {
		m[i] = [];
		for (let j = 0; j < w; j++) {
			m[i].push(Math.random());
		}
	}
	return m;
}

function makeDummyArray(l: number): number[] {
	const arr = [];
	for (let i = 0; i < l; i++) {
		arr.push(Math.random());
	}
	return arr;
}
