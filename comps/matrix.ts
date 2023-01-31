/** A two-dimensional arrangement of numbers. */
export class Matrix {
	constructor(public readonly data: number[][]) {
		if (data.some(row => row.length !== data[0].length)) {
			throw new Error('Matrix must be rectangular');
		}
	}

	/** The number of rows in this matrix. */
	get rows() {
		return this.data.length;
	}

	/** The number of columns in this matrix. */
	get columns() {
		return this.data[0].length;
	}

	/** Determines if this matrix contains only one column. */
	get isColumnMatrix() {
		return this.columns === 1;
	}

	/** Determines if this matrix contains only one row. */
	get isRowMatrix() {
		return this.rows === 1;
	}

	/** Determines if this matrix contains the same number of rows and columns. */
	get isSquare() {
		return this.rows === this.columns;
	}

	/** Determines if this matrix is equal to its transpose. */
	get isSymmetric() {
		if (!this.isSquare) {
			// Rectangular matrices cannot be symmetric
			return false;
		}

		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				if (this.data[i][j] !== this.data[j][i]) {
					return false;
				}
			}
		}

		return true;
	}

	/** Determines if the values outside the main diagonal are all zero. */
	get isDiagonal(): boolean {
		if (!this.isSquare) {
			// Rectangular matrices cannot be diagonal
			return false;
		}

		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				if (i !== j && this.data[i][j] !== 0) {
					return false;
				}
			}
		}
		return true;
	}

	/** Computes the determinant of this matrix. */
	get determinant() {
		if (!this.isSquare) {
			throw new Error('Matrix must be square');
		}

		if (this.rows === 1) {
			return this.data[0][0];
		}
		if (this.rows === 2) {
			return (
				this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0]
			);
		}

		let sum = 0;
		let sign = 1;
		for (let i = 0; i < this.columns; i++) {
			sum += sign * this.data[0][i] * this.submatrix([0], [i]).determinant;
			sign *= -1;
		}
		return sum;
	}

	/** Calculates the matrix where the rows and columns are switched. */
	get transpose() {
		const result = new Matrix(Array.from({ length: this.columns }, () => []));
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				result.data[j][i] = this.data[i][j];
			}
		}
		return result;
	}

	/** Calculates the matrix formed by all the cofactors of this matrix. */
	get cofactor() {
		if (!this.isSquare) {
			throw new Error('Matrix must be square');
		}

		const newData: number[][] = [];
		for (let i = 0; i < this.rows; i++) {
			newData.push([]);
			for (let j = 0; j < this.columns; j++) {
				newData[i].push(
					(-1.0) ** (i + j) * this.submatrix([i], [j]).determinant
				);
			}
		}
		return new Matrix(newData);
	}

	/** Returns the matrix with the specified rows and columns removed. */
	submatrix(removeRows: number[], removeCols: number[]) {
		const result = new Matrix(
			Array.from({ length: this.rows - removeRows.length }, () => [])
		);
		let rowOffset = 0;
		for (let i = 0; i < this.rows; i++) {
			if (removeRows.includes(i)) {
				rowOffset++;
				continue;
			}
			let colOffset = 0;
			for (let j = 0; j < this.columns; j++) {
				if (removeCols.includes(j)) {
					colOffset++;
					continue;
				}
				result.data[i - rowOffset][j - colOffset] = this.data[i][j];
			}
		}
		return result;
	}

	/** Computes the adjugate of this matrix. It is the transpose of the cofactor matrix. */
	get adjugate() {
		return this.cofactor.transpose;
	}

	/** Computes the inverse of this matrix. */
	get inverse() {
		if (!this.isSquare) {
			throw new Error('Matrix must be square');
		}
		const det = this.determinant;
		if (det === 0) {
			throw new Error('Matrix is not invertible');
		}
		if (this.rows === 1) {
			return new Matrix([[1 / this.get(0, 0)]]);
		}
		return this.adjugate.times(1 / det);
	}

	/** Returns the specified row of this matrix. */
	row(i: number) {
		return this.data[i];
	}

	/** Returns the specified column of this matrix. */
	col(j: number) {
		return this.data.map(row => row[j]);
	}

	/** Adds a number or another matrix to this matrix. */
	plus(other: number | Matrix) {
		if (typeof other === 'number') {
			return new Matrix(this.data.map(row => row.map(value => value + other)));
		} else {
			return new Matrix(
				this.data.map((row, i) =>
					row.map((value, j) => value + other.data[i][j])
				)
			);
		}
	}

	/** Subtracts a number or another matrix to this matrix. */
	minus(other: number | Matrix) {
		if (typeof other === 'number') {
			return new Matrix(this.data.map(row => row.map(value => value - other)));
		} else {
			return new Matrix(
				this.data.map((row, i) =>
					row.map((value, j) => value - other.data[i][j])
				)
			);
		}
	}

	/** Multiplies a number or another matrix to this matrix. */
	times(other: number | Matrix) {
		if (typeof other === 'number') {
			return new Matrix(this.data.map(row => row.map(value => value * other)));
		} else {
			return new Matrix(
				Array.from({ length: this.rows }, (_, r) =>
					Array.from({ length: other.columns }, (_, c) =>
						Matrix.dotProduct(this.row(r), other.col(c))
					)
				)
			);
		}
	}

	/** Returns a specific element of this matrix. */
	get(row: number, col: number): number {
		return this.data[row][col];
	}

	/** Computes the dot product of two vectors. */
	static dotProduct(a: number[], b: number[]) {
		if (a.length !== b.length)
			throw new Error('Dot product requires vectors of equal length');
		return a.reduce((sum, value, i) => sum + value * b[i], 0);
	}

	/** Generates the identity matrix of the specified size. */
	static identity(n: number) {
		return new Matrix(
			Array.from({ length: n }, (_, i) =>
				Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
			)
		);
	}

	/** Generates the zero matrix of the specified size. */
	static zero(rows: number, columns: number) {
		return new Matrix(
			Array.from({ length: rows }, () =>
				Array.from({ length: columns }, () => 0)
			)
		);
	}

	/** Generates a matrix where all values fall on the main diagonal. */
	static diagonal(values: number[]) {
		return new Matrix(
			Array.from({ length: values.length }, (_, i) =>
				Array.from({ length: values.length }, (_, j) =>
					i === j ? values[i] : 0
				)
			)
		);
	}
}
