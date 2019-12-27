import Matrix from "./matrix";

function sigmoid(x: number): number {
	return 1 / (1 + Math.exp(-x));
}

function dSigmoid(x: number): number {
	return x * (1 - x);
}

type CtorParams = {
	input: number;
	hidden: number;
	output: number;
	learningRate: number;
	iterations: number;
};

export default class MLP {
	private inputsToHidden: Matrix;
	private readonly biasInputsToHidden: Matrix;
	private hiddenToOutputs: Matrix;
	private readonly biasHiddenToOutputs: Matrix;
	private readonly learningRate: number;
	private readonly iterations: number;

	constructor({ input, hidden, output, learningRate, iterations }: CtorParams) {
		this.inputsToHidden = new Matrix(hidden, input, "RANDOM");
		this.biasInputsToHidden = new Matrix(hidden, 1, "RANDOM");
		this.hiddenToOutputs = new Matrix(output, hidden, "RANDOM");
		this.biasHiddenToOutputs = new Matrix(output, 1, "RANDOM");
		this.learningRate = learningRate;
		this.iterations = iterations;
	}

	public predict(inputs: number[]): Matrix {
		const inputsMatrix = new Matrix(inputs.length, 1, inputs);

		const hidden = this.inputsToHidden.multiply(inputsMatrix);
		hidden.add(this.biasInputsToHidden);
		hidden.forEach(sigmoid);

		const output = this.hiddenToOutputs.multiply(hidden);
		output.add(this.biasHiddenToOutputs);
		output.forEach(sigmoid);

		return output;
	}

	public fit(inputs: number[][], labels: number[][]) {
		let iterations = 0;
		while (iterations < this.iterations) {
			for (let i = 0; i < inputs.length; i++) {
				const input = new Matrix(inputs[i].length, 1, inputs[i]);
				const hidden = this.inputsToHidden.multiply(input);
				hidden.add(this.biasInputsToHidden);
				hidden.forEach(sigmoid);

				const outputs = this.hiddenToOutputs.multiply(hidden);
				outputs.add(this.biasHiddenToOutputs);
				outputs.forEach(sigmoid);

				const outputErrors = new Matrix(labels[i].length, 1, labels[i]);

				outputErrors.subtract(outputs);

				outputs.forEach(dSigmoid);
				outputs.hadamard(outputErrors);
				outputs.scalar(this.learningRate);

				hidden.transpose();

				const hiddenToOutputsDeltas = outputs.multiply(hidden);

				hidden.transpose();

				this.hiddenToOutputs.add(hiddenToOutputsDeltas);
				this.biasHiddenToOutputs.add(outputs);

				this.hiddenToOutputs.transpose();

				const hiddenErrors = this.hiddenToOutputs.multiply(outputErrors);

				this.hiddenToOutputs.transpose();

				hidden.forEach(dSigmoid);
				hidden.hadamard(hiddenErrors);
				hidden.scalar(this.learningRate);

				input.transpose();

				const inputsToHiddenDeltas = hidden.multiply(input);

				this.inputsToHidden.add(inputsToHiddenDeltas);
				this.biasInputsToHidden.add(hidden);
			}

			iterations++;
		}
	}

	public shuffle(x: number[][], y: number[][]): void {
		for (let i = 0; i < y.length; i++) {
			const pos = Math.floor(Math.random() * y.length);

			[y[i], y[pos]] = [y[pos], y[i]];
			[x[i], x[pos]] = [x[pos], x[i]];
		}
	}
}
