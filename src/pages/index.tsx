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

let computerPlay: Play = "ROCK";

function getResult(player: Play, computer: Play): "WIN" | "LOSS" | "TIE" {
	if (player === "ROCK") {
		if (computer === "ROCK") {
			return "TIE";
		}

		if (computer === "PAPER") {
			return "LOSS";
		}

		if (computer === "SCISSORS") {
			return "WIN";
		}
	}

	if (player === "PAPER") {
		if (computer === "ROCK") {
			return "WIN";
		}

		if (computer === "PAPER") {
			return "TIE";
		}

		if (computer === "SCISSORS") {
			return "LOSS";
		}
	}

	if (player === "SCISSORS") {
		if (computer === "ROCK") {
			return "LOSS";
		}

		if (computer === "PAPER") {
			return "WIN";
		}

		if (computer === "SCISSORS") {
			return "TIE";
		}
	}

	throw new Error("Unreachable code");
}

const reducer: Reducer<State, Action> = (prevState, action) => {
	const playerPlay: Play = action.slice("PLAYER_PLAY_".length) as Play;
	const result = getResult(playerPlay, computerPlay);

	switch (result) {
		case "WIN": {
			const nextState: State = {
				...prevState,
				score: {
					...prevState.score,
					wins: prevState.score.wins + 1,
				},
			};

			return nextState;
		}
		case "LOSS": {
			const nextState: State = {
				...prevState,
				score: {
					...prevState.score,
					losses: prevState.score.losses + 1,
				},
			};

			return nextState;
		}
		case "TIE": {
			const nextState: State = {
				...prevState,
				score: {
					...prevState.score,
					ties: prevState.score.ties + 1,
				},
			};

			return nextState;
		}
		default:
			throw new Error("Unreachable code");
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
