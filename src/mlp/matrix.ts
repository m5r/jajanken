export default class Matrix {
	private readonly data: number[];

	constructor(
		private rows: number = 0,
		private cols: number = 0,
		values: number[] | number | "RANDOM" = 0,
	) {
		if (Array.isArray(values)) {
			this.data = values.slice();
		} else if (values == "RANDOM") {
			this.data = Array(this.rows * this.cols).fill(0).map(_ => Math.random() * 2 - 1);
		} else {
			this.data = Array(this.rows * this.cols).fill(values);
		}
	}

	public multiply(b: Matrix) {
		if (b.rows !== this.cols) {
			throw new Error("Matrices of different sizes");
		}

		let result = new Matrix(this.rows, b.cols);

		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < b.cols; j++) {
				let s = 0;
				for (let k = 0; k < this.cols; k++) {
					s += this.data[i * this.cols + k] * b.data[k * b.cols + j];
				}
				result.data[i * result.cols + j] = s;
			}
		}
		return result;
	}

	public transpose() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				let temp = this.data[i * this.cols + j];
				this.data[i * this.cols + j] = this.data[j * this.rows + i];
				this.data[j * this.rows + i] = temp;
			}
		}
		let temp = this.cols;
		this.cols = this.rows;
		this.rows = temp;
	}

	public add(a: Matrix) {
		if (this.rows !== a.rows || this.cols !== a.cols) {
			throw new Error("Matrices of different sizes");
		}
		for (let i = 0; i < this.data.length; i++) {
			this.data[i] += a.data[i];
		}
	}

	public subtract(a: Matrix) {
		if (this.rows !== a.rows || this.cols !== a.cols) {
			throw new Error("Matrices of different sizes");
		}
		for (let i = 0; i < this.data.length; i++) {
			this.data[i] -= a.data[i];
		}
	}

	public scalar(a: number) {
		for (let i = 0; i < this.data.length; i++) {
			this.data[i] *= a;
		}
	}

	public hadamard(a: Matrix): void {
		if (this.rows !== a.rows || this.cols !== a.cols) {
			throw new Error("Matrices of different sizes");
		}

		for (let i = 0; i < this.data.length; i++) {
			this.data[i] *= a.data[i];
		}
	}

	public forEach(func: (x: number) => number) {
		for (let i = 0; i < this.data.length; i++) {
			this.data[i] = func(this.data[i]);
		}
	}
}
