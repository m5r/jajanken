import { NextPage } from "next";
import { useReducer, Reducer } from "react";

import Scoreboard from "../components/scoreboard";
import PlayerAction from "../components/player-action";
import MainSection from "../components/main-section";

import { Move, Result } from "../shared-types";
import { useMLP } from "../mlp/hook";

type State = {
	score: {
		wins: number;
		ties: number;
		losses: number;
	};
	lastPlayerMove: Move | null;
	lastComputerMove: Move | null;
	lastResult: Result | null;
};

type Action = "PLAYER_PLAY_ROCK" | "PLAYER_PLAY_PAPER" | "PLAYER_PLAY_SCISSORS";

const initialState: State = {
	score: {
		wins: 0,
		ties: 0,
		losses: 0,
	},
	lastPlayerMove: null,
	lastComputerMove: null,
	lastResult: null,
};

function getResult(player: Move, computer: Move): Result {
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
	const { lastPlayerMove, lastResult } = prevState;
	const predict = useMLP();

	const playerMove: Move = action.slice("PLAYER_PLAY_".length) as Move;
	const computerMove = predict({ playerMove, lastPlayerMove, lastResult });
	const result = getResult(playerMove, computerMove);
	let nextState: State = {
		...prevState,
		lastPlayerMove: playerMove,
		lastComputerMove: computerMove,
		lastResult: result,
	};

	switch (result) {
		case "WIN": {
			nextState = {
				...nextState,
				score: {
					...nextState.score,
					wins: nextState.score.wins + 1,
				},
			};

			return nextState;
		}
		case "LOSS": {
			nextState = {
				...nextState,
				score: {
					...nextState.score,
					losses: nextState.score.losses + 1,
				},
			};

			return nextState;
		}
		case "TIE": {
			nextState = {
				...nextState,
				score: {
					...nextState.score,
					ties: nextState.score.ties + 1,
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
		<section className="jjk-background h-full w-full flex flex-col justify-between items-center">
			<Scoreboard score={state.score} />

			<MainSection
				lastPlayerMove={state.lastPlayerMove}
				lastComputerMove={state.lastComputerMove}
				lastResult={state.lastResult}
			/>

			<footer className="h-32 lg:h-48 w-full flex justify-around">
				<PlayerAction
					onClick={() => dispatch("PLAYER_PLAY_ROCK")}
					move="ROCK"
				/>
				<PlayerAction
					onClick={() => dispatch("PLAYER_PLAY_PAPER")}
					move="PAPER"
				/>
				<PlayerAction
					onClick={() => dispatch("PLAYER_PLAY_SCISSORS")}
					move="SCISSORS"
				/>
			</footer>
		</section>
	);
};

export default Index;
