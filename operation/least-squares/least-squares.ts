/**
 * Performs a least-squares adjustment of a system of equations.
 * @param unknowns The number of unknown quantities.
 * @param observations The number of observations, or equations.
 * @param A A function to return the appropriate value in the A matrix.
 * @param L A function to return the appropriate value in the L matrix.
 * @param W A function to return the appropriate value in the W matrix.
 */
export function AdjustLeastSquares(
	unknowns: number,
	observations: number,
	A: (i: number, j: number) => number,
	L: (i: number) => number,
	W: (i: number) => number
) {
	/// Part A: Solution ///

	// Step 1: Form normal equations and constants vector directly from observations
	// (Ghilani 26.3)

	let N: number[] = []; // We flatten N matrix since it is symmetric
	let C: number[] = [];

	for (let h = 0; h < observations; h++) {
		for (let i = 0; i < unknowns; i++) {
			for (let j = i; j < unknowns; j++) {
				let vi = flattenIndex(i, j);
				N[vi] = (N[vi] ?? 0) + A(h, i) * A(h, j) * W(h);
			}
			C[i] = (C[i] ?? 0) + A(h, i) * L(h) * W(h);
		}
	}

	// Step 2: Perform Cholesky decomposition.
	// (Ghilani 26.4)

	const CL: number[] = []; // We flatten CL (cholesky) matrix since it is triangular
	for (let i = 0; i < unknowns; i++) {
		for (let j = 0; j <= i; j++) {
			let sum = 0;
			for (let k = 0; k < j; k++) {
				sum += (CL[flattenIndex(i, k)] ?? 0) * (CL[flattenIndex(j, k)] ?? 0);
			}
			if (i == j) {
				CL[flattenIndex(i, j)] = Math.sqrt(N[flattenIndex(i, i)] - sum);
			} else {
				CL[flattenIndex(i, j)] =
					(1.0 / CL[flattenIndex(j, j)]) * (N[flattenIndex(i, j)] - sum);
			}
		}
	}

	// Step 3: Forward and Backward Substitution
	// (Ghilani 26.5)

	const Y: number[] = [];
	for (let i = 0; i < unknowns; i++) {
		Y[i] = 0;
		let sum = C[i];
		for (let j = 0; j <= i - 1; j++) {
			sum -= CL[flattenIndex(i, j)] * Y[j];
		}
		Y[i] = sum / CL[flattenIndex(i, i)];
	}

	const X: number[] = [];
	for (let i = unknowns - 1; i >= 0; i--) {
		X[i] = 0;
		let sum = Y[i];
		for (let j = i + 1; j < unknowns; j++) {
			sum -= CL[flattenIndex(j, i)] * X[j];
		}
		X[i] = sum / CL[flattenIndex(i, i)];
	}

	/// Part B: Residuals ///

	const V: number[] = [];
	for (let i = 0; i < observations; i++) {
		V[i] = 0;
		for (let j = 0; j < unknowns; j++) {
			V[i] += A(i, j) * X[j];
		}
		V[i] -= L(i);
	}

	/// Part C: Reference standard deviation ///
	let So = 0;
	for (let i = 0; i < observations; i++) {
		So += W(i) * V[i] ** 2;
	}
	So = Math.sqrt(So / (observations - unknowns));

	return { X, V, So };
}

function flattenIndex(row: number, col: number): number {
	if (row > col) {
		// Swap
		return flattenIndex(col, row);
	}
	const n = col + 1;
	return ((n * (n - 1)) >> 1) + row;
}
