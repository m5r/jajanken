import { useRef } from "react";

import MLP from "./mlp";
import { Play } from "../shared-types";

const PLAYS: Play[] = ["ROCK", "PAPER", "SCISSORS"];

export function useMLP() {
	const mlp = new MLP({ input: 3, hidden: 3, output: 3, learningRate: 0.1, iterations: 300 });
	const ref = useRef<MLP>(mlp);

	const predict = () => PLAYS[Math.floor(Math.random() * 3)];

	return {
		predict,
	};
}
