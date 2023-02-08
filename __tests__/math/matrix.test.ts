import { Matrix } from '../../comps/matrix';

describe('Matrix', () => {
	it('should not make an improper matrix', () => {
		expect(
			() =>
				new Matrix([
					[1, 2],
					[3, 4, 5],
				])
		).toThrow();
	});
	it('should return the number of rows', () => {
		const m = new Matrix([
			[1, 2, 3],
			[4, 5, 6],
		]);
		expect(m.rows).toBe(2);
	});
	it('should return the number of columns', () => {
		const m = new Matrix([
			[1, 2, 3],
			[4, 5, 6],
		]);
		expect(m.columns).toBe(3);
	});
	it('should return the data', () => {
		const m = new Matrix([
			[1, 2, 3],
			[4, 5, 6],
		]);
		expect(m.get(0, 0)).toBe(1);
		expect(m.get(0, 1)).toBe(2);
		expect(m.get(0, 2)).toBe(3);
		expect(m.get(1, 0)).toBe(4);
		expect(m.get(1, 1)).toBe(5);
		expect(m.get(1, 2)).toBe(6);
	});
	it('should return isColumnMatrix', () => {
		const m = new Matrix([[1], [2]]);
		expect(m.isColumnMatrix).toBe(true);
		const n = new Matrix([
			[1, 2],
			[3, 4],
		]);
		expect(n.isColumnMatrix).toBe(false);
	});
	it('should return isRowMatrix', () => {
		const m = new Matrix([[1, 2]]);
		expect(m.isRowMatrix).toBe(true);
		const n = new Matrix([
			[1, 2],
			[3, 4],
		]);
		expect(n.isRowMatrix).toBe(false);
	});
	it('should return isSymmetric', () => {
		const m = new Matrix([
			[2, -4, 6],
			[-4, 7, 3],
			[6, 3, 5],
		]);
		expect(m.isSymmetric).toBe(true);
		const n = new Matrix([
			[1, 0, 2, 3],
			[9, 3, 8, 6],
			[0, 4, 7, 1],
		]);
		expect(n.isSymmetric).toBe(false);
		const o = new Matrix([
			[2, -4, 6],
			[-4, 7, 4],
			[6, 3, 5],
		]);
		expect(o.isSymmetric).toBe(false);
	});
	it('should return isDiagonal', () => {
		const m = new Matrix([
			[1, 0, 0],
			[0, 2, 0],
			[0, 0, 3],
		]);
		expect(m.isDiagonal).toBe(true);
		const n = new Matrix([
			[1, 0, 2, 3],
			[9, 3, 8, 6],
			[0, 4, 7, 1],
		]);
		expect(n.isDiagonal).toBe(false);
		const o = new Matrix([
			[1, 0, 0],
			[0, 2, 69420],
			[0, 0, 3],
		]);
		expect(o.isDiagonal).toBe(false);
	});
	it('should return isSquare', () => {
		const m = new Matrix([
			[1, 2],
			[3, 4],
		]);
		expect(m.isSquare).toBe(true);
		const n = new Matrix([
			[1, 2, 3],
			[4, 5, 6],
		]);
		expect(n.isSquare).toBe(false);
	});
	it('should generate an identity matrix', () => {
		const m = Matrix.identity(3);
		const n = new Matrix([
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1],
		]);
		expect(m.data).toEqual(n.data);
	});
	it('should generate a zero matrix', () => {
		const m = Matrix.zero(3, 2);
		const n = new Matrix([
			[0, 0],
			[0, 0],
			[0, 0],
		]);
		expect(m.data).toEqual(n.data);
	});
	it('should add matrices', () => {
		const m = new Matrix([
			[1, 2],
			[3, 4],
		]);
		const n = new Matrix([
			[5, 6],
			[7, 8],
		]);
		const o = new Matrix([
			[6, 8],
			[10, 12],
		]);
		expect(m.plus(n).data).toEqual(o.data);
	});
	it('should subtract matrices', () => {
		const m = new Matrix([
			[1, 2],
			[3, 4],
		]);
		const n = new Matrix([
			[5, 6],
			[7, 8],
		]);
		const o = new Matrix([
			[-4, -4],
			[-4, -4],
		]);
		expect(m.minus(n).data).toEqual(o.data);
	});
	it('should return a specific row', () => {
		const m = new Matrix([
			[1, 2],
			[3, 4],
		]);
		const n = [1, 2];
		expect(m.row(0)).toEqual(n);
	});
	it('should return a specific column', () => {
		const m = new Matrix([
			[1, 2],
			[3, 4],
		]);
		const n = [2, 4];
		expect(m.col(1)).toEqual(n);
	});
	it('should compute the dot product', () => {
		const a = [1, 2, 3];
		const b = [7, 9, 11];
		expect(Matrix.dotProduct(a, b)).toEqual(58);
	});
	it('should multiply matrices', () => {
		const a = new Matrix([
			[1, 2, 3],
			[4, 2, 7],
		]);
		const b = new Matrix([
			[4, 8],
			[6, 2],
			[5, 3],
		]);
		const x = new Matrix([
			[31, 21],
			[63, 57],
		]);
		expect(a.times(b).data).toEqual(x.data);
		const c = new Matrix([
			[2, 2],
			[1, 1],
		]);
		const d = new Matrix([
			[-1, -2],
			[1, 2],
		]);
		const y = Matrix.zero(2, 2);
		expect(c.times(d).data).toEqual(y.data);
	});
	it('should multiply transposed matrices', () => {
		const a = new Matrix([
			[1, 2, 3],
			[4, 2, 7],
		]);
		const b = new Matrix([
			[4, 8],
			[6, 2],
			[5, 3],
		]);
		const x = new Matrix([
			[31, 63],
			[21, 57],
		]);
		expect(a.times(b).transpose.data).toEqual(x.data);
		expect(b.transpose.times(a.transpose).data).toEqual(x.data);
	});
	it('should add scalars', () => {
		const m = new Matrix([
			[1, 2],
			[3, 4],
		]);
		const n = new Matrix([
			[2, 3],
			[4, 5],
		]);
		expect(m.plus(1).data).toEqual(n.data);
	});
	it('should subtract scalars', () => {
		const m = new Matrix([
			[1, 2],
			[3, 4],
		]);
		const n = new Matrix([
			[0, 1],
			[2, 3],
		]);
		expect(m.minus(1).data).toEqual(n.data);
	});
	it('should not multiply incompatible matrices', () => {
		const a = Matrix.identity(2);
		const b = Matrix.identity(3);
		expect(() => a.times(b)).toThrow();
	});
	it('should compute a submatrix', () => {
		const m = new Matrix([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		]);
		const n = new Matrix([
			[5, 6],
			[8, 9],
		]);
		const o = new Matrix([[1]]);
		const p = new Matrix([[5]]);
		expect(m.submatrix([0], [0]).data).toEqual(n.data);
		expect(m.submatrix([1, 2], [1, 2]).data).toEqual(o.data);
		expect(m.submatrix([0, 2], [0, 2]).data).toEqual(p.data);
	});
	it('should compute the determinant', () => {
		const l = new Matrix([[69]]);
		expect(l.determinant).toEqual(69);
		const m = new Matrix([
			[1, 2],
			[3, 4],
		]);
		expect(m.determinant).toBeCloseTo(-2);
		const n = new Matrix([
			[2, 9, 8],
			[4, 6, 1],
			[7, 5, 3],
		]);
		expect(n.determinant).toBeCloseTo(-195);
		const o = new Matrix([
			[2, 9, 8, 10],
			[4, 6, 1, 11],
			[7, 5, 3, 12],
			[13, 14, 15, 16],
		]);
		expect(o.determinant).toBeCloseTo(1650);
	});
	it('should compute the cofactor', () => {
		const a = new Matrix([
			[1, 2, 3],
			[0, 4, 5],
			[1, 0, 6],
		]);
		const b = new Matrix([
			[24, 5, -4],
			[-12, 3, 2],
			[-2, -5, 4],
		]);
		expect(a.cofactor.data).toEqual(b.data);

		const c = new Matrix([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		]);
		const d = new Matrix([
			[-3, 6, -3],
			[6, -12, 6],
			[-3, 6, -3],
		]);
		// iterate over the cofactor matrix and check with closeTo
		c.cofactor.data.forEach((row, i) => {
			row.forEach((val, j) => {
				expect(val).toBeCloseTo(d.data[i][j]);
			});
		});
	});

	it('should compute the adjugate', () => {
		const a = new Matrix([
			[1, 2, 3, 10],
			[4, 5, 6, 11],
			[7, 8, 9, 12],
			[13, 14, 15, 16],
		]);
		const b = new Matrix([
			[-6, 12, -6, 0],
			[12, -24, 12, 0],
			[-6, 12, -6, 0],
			[0, 0, 0, 0],
		]);

		a.cofactor.data.forEach((row, i) => {
			row.forEach((val, j) => {
				expect(val).toBeCloseTo(b.data[i][j]);
			});
		});
	});

	it('should compute the inverse', () => {
		const c = new Matrix([
			[4, 3, 2],
			[3, 4, 1],
			[2, 3, 4],
		]);
		const d = new Matrix([
			[13 / 24.0, -1 / 4.0, -5 / 24.0],
			[-5 / 12.0, 1 / 2.0, 1 / 12.0],
			[1 / 24.0, -1 / 4.0, 7 / 24.0],
		]);
		c.inverse.data.forEach((row, i) => {
			row.forEach((val, j) => {
				expect(val).toBeCloseTo(d.data[i][j]);
			});
		});

		const e = new Matrix([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		]);
		expect(() => e.inverse).toThrow();
	});

	it('should not compute cofactor of rectangular matrix', () => {
		const a = new Matrix([
			[1, 2, 3],
			[0, 4, 5],
		]);
		expect(() => a.cofactor).toThrow();
	});

	it('should not compute inverse of rectangular matrix', () => {
		const a = new Matrix([
			[1, 2, 3],
			[0, 4, 5],
		]);
		expect(() => a.inverse).toThrow();
	});

	it('should not compute determinant of rectangular matrix', () => {
		const a = new Matrix([
			[1, 2, 3],
			[0, 4, 5],
		]);
		expect(() => a.determinant).toThrow();
	});

	it('should make a diagonal matrix', () => {
		const a = Matrix.diagonal([1, 2, 3]);
		const b = new Matrix([
			[1, 0, 0],
			[0, 2, 0],
			[0, 0, 3],
		]);
		expect(a.data).toEqual(b.data);
	});
});
