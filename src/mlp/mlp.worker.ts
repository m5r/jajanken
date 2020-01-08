import MLP from "./mlp";

import { MoveAsArray } from "../shared-types";

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

function isMessage(data: any): data is Message {
	if (!data.hasOwnProperty("type") || !data.hasOwnProperty("params")) {
		return false;
	}

	if (["predict", "train"].indexOf(data.type) === -1) {
		return false;
	}

	if (data.type === "predict") {
		if (!data.params.hasOwnProperty("lastPlayerMoveAsArray")) {
			return false;
		}
	}

	if (data.type === "train") {
		if (!data.params.hasOwnProperty("xMatrix") || !data.params.hasOwnProperty("yMatrix")) {
			return false;
		}
	}

	return true;
}

const ctx: Worker = self as any;

ctx.addEventListener<"message">("message", (event) => {
	const message: Message = JSON.parse(event.data);
	if (!isMessage(message)) {
		throw new Error("Malformed message");
	}

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