import { NextPage } from "next";
import { useReducer, Reducer } from "react";

import Scoreboard from "../components/scoreboard";
import PlayerAction from "../components/player-action";

type State = {
	score: {
		wins: number;
		ties: number;
		losses: number;
	};
};

type Play = "ROCK" | "PAPER" | "SCISSORS";

type Action = "PLAYER_PLAY_ROCK" | "PLAYER_PLAY_PAPER" | "PLAYER_PLAY_SCISSORS";

const initialState: State = {
	score: {
		wins: 0,
		ties: 0,
		losses: 0,
	},
};

let playFromCPU: Play = "ROCK";

const reducer: Reducer<State, Action> = (prevState, action) => {
	// assign playFromCPU

	switch (action) {
		case "PLAYER_PLAY_ROCK":
			switch (playFromCPU) {
				case "PAPER":
					return {
						...prevState,
						score: {
							...prevState.score,
							losses: prevState.score.losses + 1,
						},
					};
				case "ROCK":
					return {
						...prevState,
						score: {
							...prevState.score,
							ties: prevState.score.ties + 1,
						},
					};
				case "SCISSORS":
					return {
						...prevState,
						score: {
							...prevState.score,
							wins: prevState.score.wins + 1,
						},
					};
				default:
					throw new Error("Unreachable code");
			}
		case "PLAYER_PLAY_PAPER":
			switch (playFromCPU) {
				case "SCISSORS":
					return {
						...prevState,
						score: {
							...prevState.score,
							losses: prevState.score.losses + 1,
						},
					};
				case "PAPER":
					return {
						...prevState,
						score: {
							...prevState.score,
							ties: prevState.score.ties + 1,
						},
					};
				case "ROCK":
					return {
						...prevState,
						score: {
							...prevState.score,
							wins: prevState.score.wins + 1,
						},
					};
				default:
					throw new Error("Unreachable code");
			}
		case "PLAYER_PLAY_SCISSORS":
			switch (playFromCPU) {
				case "ROCK":
					return {
						...prevState,
						score: {
							...prevState.score,
							losses: prevState.score.losses + 1,
						},
					};
				case "SCISSORS":
					return {
						...prevState,
						score: {
							...prevState.score,
							ties: prevState.score.ties + 1,
						},
					};
				case "PAPER":
					return {
						...prevState,
						score: {
							...prevState.score,
							wins: prevState.score.wins + 1,
						},
					};
				default:
					throw new Error("Unreachable code");
			}
		default:
			throw new Error("Unhandled event");
	}
};

const Index: NextPage = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<section className="h-full w-full flex flex-col justify-between items-center">
			<Scoreboard score={state.score} />

			<main className="w-full flex flex-col text-center font-mono text-2xl">
				<div className="m-auto">Use the three buttons below to play</div>
				<div className="m-auto">Start playing and see how you do against this AI!</div>
			</main>

			<footer className="h-32 lg:h-48 w-full flex justify-around">
				<PlayerAction onClick={() => dispatch("PLAYER_PLAY_ROCK")} action="rock" />
				<PlayerAction onClick={() => dispatch("PLAYER_PLAY_PAPER")} action="paper" />
				<PlayerAction onClick={() => dispatch("PLAYER_PLAY_SCISSORS")} action="scissors" />
			</footer>
		</section>
	);
};

export default Index;
