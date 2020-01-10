import { useState } from "react";

// @ts-ignore
import MLPWorker from "worker-loader?name=static/[hash].worker.js!./mlp.worker";

import { Move, MoveAsArray, Result } from "../shared-types";

const MOVES: Move[] = ["ROCK", "PAPER", "SCISSORS"];

function translateMoveToArray(move: Move): MoveAsArray {
	const array = Array<number>(3).fill(0);
	const index = MOVES.indexOf(move);
	if (index < 0 || index > 2) {
		throw new Error();
	}

	array[MOVES.indexOf(move)] = 1;

	return array as MoveAsArray;
}

type AddMoveParams = {
	playerMove: Move;
	lastPlayerMove: Move | null;
	lastResult: Result | null;
}

const mlpWorker = new MLPWorker();
const mlpProxy = {
	predict(lastPlayerMoveAsArray: MoveAsArray) {
		const message = {
			type: "predict",
			params: { lastPlayerMoveAsArray },
		};

		mlpWorker.postMessage(JSON.stringify(message));
	},
	train(xMatrix: number[][], yMatrix: number[][]) {
		const message = {
			type: "train",
			params: { xMatrix, yMatrix },
		};

		mlpWorker.postMessage(JSON.stringify(message));
	},
};

export function useMLP() {
	const [moves, setMoves] = useState<MoveAsArray[]>([]);
	const [xMatrix, setXMatrix] = useState<number[][]>([]);
	const [yMatrix, setYMatrix] = useState<number[][]>([]);

	return {
		async predict(lastPlayerMove: Move | null): Promise<Move> {
			if (lastPlayerMove === null || yMatrix.length < 3) {
				return MOVES[Math.floor(Math.random() * 3)];
			}

			return new Promise((resolve) => {
				const lastPlayerMoveAsArray = translateMoveToArray(lastPlayerMove);
				mlpProxy.predict(lastPlayerMoveAsArray);

				function onMessage(event: MessageEvent) {
					const prediction = JSON.parse(event.data);
					const computer = (prediction.indexOf(Math.max(...prediction)) + 1) % 3;

					resolve(MOVES[computer]);

					mlpWorker.removeEventListener("message", onMessage);
				}

				mlpWorker.addEventListener("message", onMessage);
			});
		},
		async train({ playerMove, lastPlayerMove, lastResult }: AddMoveParams): Promise<void> {
			const playerMoveAsArray = translateMoveToArray(playerMove);
			const nextMoves = [...moves, playerMoveAsArray];
			let nextXMatrix = xMatrix;
			let nextYMatrix = yMatrix;
			if (nextMoves.length === 2) {
				nextXMatrix = [...xMatrix, nextMoves.shift()!];
				nextYMatrix = [...yMatrix, nextMoves[0]];
			}

			if (nextYMatrix.length < 3 || lastPlayerMove === null) {
				setMoves(nextMoves);
				setXMatrix(nextXMatrix);
				setYMatrix(nextYMatrix);
			}

			if (lastResult !== "LOSS") {
				mlpProxy.train(nextXMatrix, nextYMatrix);
			}

			setMoves(nextMoves);
			setXMatrix(nextXMatrix);
			setYMatrix(nextYMatrix);
		},
	};
}
