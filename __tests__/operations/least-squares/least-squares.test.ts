import { AdjustLeastSquares } from '../../../operation/least-squares/least-squares';

describe('least-squares', function () {
	it('should work with dummy data', function () {
		const A = [
			[1, 1],
			[2, -1],
			[1, -1]
		];
		const L = [3, 1.5, 0.2];
		const W = [1, 1, 1];
		const { X, V, So } = AdjustLeastSquares(
			2,
			3,
			(i, j) => {
				return A[i][j];
			},
			(i) => {
				return L[i];
			},
			(i) => {
				return W[i];
			}
		);
	});
});