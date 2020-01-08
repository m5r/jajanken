import MLP from "./mlp";

type MoveAsArray = [1, 0, 0] | [0, 1, 0] | [0, 0, 1];

const mlp = new MLP({ input: 3, hidden: 3, output: 3, learningRate: 0.1, iterations: 300 });

type Message = {
	type: "predict";
	params: {
		lastPlayerMoveAsArray: MoveAsArray;
	};
} | {
	type: "train";
	params: {
		xMatrix: number[][];
		yMatrix: number[][];
	};
}

const ctx: Worker = self as any;

ctx.addEventListener<"message">("message", (event) => {
	const message: Message = JSON.parse(event.data);

	switch (message.type) {
		case "predict":
			const predictedMove = mlp.predict(message.params.lastPlayerMoveAsArray).data;
			const response = JSON.stringify(predictedMove);
			ctx.postMessage(response);
			break;
		case "train":
			const { xMatrix, yMatrix } = message.params;

			mlp.fit(xMatrix, yMatrix);
			mlp.shuffle(xMatrix, yMatrix);
			break;
		default:
			throw new Error("Unreachable code");
	}
});