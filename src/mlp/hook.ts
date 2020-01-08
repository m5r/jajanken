import { useRef, useState } from "react";

import MLP from "./mlp";
import { Move, Result } from "../shared-types";

type MoveAsArray = [1, 0, 0] | [0, 1, 0] | [0, 0, 1];

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

const mlp = new MLP({ input: 3, hidden: 3, output: 3, learningRate: 0.1, iterations: 300 });

type AddMoveParams = {
	playerMove: Move;
	lastPlayerMove: Move | null;
	lastResult: Result | null;
}

export function useMLP() {
	const mlpRef = useRef<MLP>(mlp);
	const [moves, setMoves] = useState<MoveAsArray[]>([]);
	const [xMatrix, setXMatrix] = useState<number[][]>([]);
	const [yMatrix, setYMatrix] = useState<number[][]>([]);

	return {
		async predict(lastPlayerMove: Move | null): Promise<Move> {
			if (lastPlayerMove === null || yMatrix.length < 3) {
				return MOVES[Math.floor(Math.random() * 3)];
			}

			const lastPlayerMoveAsArray = translateMoveToArray(lastPlayerMove);
			const { data: prediction } = await mlpRef.current.predict(lastPlayerMoveAsArray); // TODO: workerize
			const computer = (prediction.indexOf(Math.max(...prediction)) + 1) % 3;

			return MOVES[computer];
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
				mlpRef.current.shuffle(nextXMatrix, nextYMatrix);
				mlpRef.current.fit(nextXMatrix, nextYMatrix);
			}

			setMoves(nextMoves);
			setXMatrix(nextXMatrix);
			setYMatrix(nextYMatrix);
		}
	};
}
