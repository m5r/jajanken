import { NextPage } from "next";
import { useReducer, Reducer } from "react";

import { useMLP } from "../MLP/hook";

type State = {
	score: {
		wins: number;
		ties: number;
		losses: number;
	};
};

type Action = "PLAYER_PLAY_ROCK" | "PLAYER_PLAY_PAPER" | "PLAYER_PLAY_SCISSORS";

const initialState: State = {
	score: {
		wins: 0,
		ties: 0,
		losses: 0,
	},
};

const reducer: Reducer<State, Action> = (prevState, action) => {
	switch (action) {
		case "PLAYER_PLAY_ROCK":
		case "PLAYER_PLAY_PAPER":
		case "PLAYER_PLAY_SCISSORS":
		default:
			return prevState;
	}

	return prevState;
};

const Index: NextPage = () => {
	const mlp = useMLP();
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<section className="h-full w-full flex flex-col justify-between items-center">
			<header className="flex flex-row w-full justify-between">
				<div>{state.score.wins} Wins</div>
				<div>{state.score.ties} Ties</div>
				<div>{state.score.losses} Losses</div>
			</header>

			<main className="w-full flex flex-col items-center">
				<div>Rock x Rock</div>
				<div>Tie</div>
			</main>

			<footer className="w-full flex justify-between">
				<button onClick={() => dispatch("PLAYER_PLAY_ROCK")}>Rock</button>
				<button onClick={() => dispatch("PLAYER_PLAY_PAPER")}>Paper</button>
				<button onClick={() => dispatch("PLAYER_PLAY_SCISSORS")}>Scissors</button>
			</footer>
		</section>
	);
};

export default Index;
