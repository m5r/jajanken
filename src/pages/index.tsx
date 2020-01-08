import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useReducer, Reducer } from "react";

import Scoreboard from "../components/scoreboard";
import PlayerAction from "../components/player-action";

const MainSection = dynamic(() => import("../components/main-section"), { ssr: false });

import { Move, Result } from "../shared-types";

export type State = {
	score: {
		wins: number;
		ties: number;
		losses: number;
	};
	lastPlay: {
		playerMove: Move | null;
		computerMove: Move | null;
		result: Result | null;
	};
	currentMove: Move | null;
	isPredicting: boolean;
};

export type Action = {
	playerMove: Move;
	computerMove: Move | null;
};

const initialState: State = {
	score: {
		wins: 0,
		ties: 0,
		losses: 0,
	},
	lastPlay: {
		playerMove: null,
		computerMove: null,
		result: null,
	},
	currentMove: null,
	isPredicting: false,
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

const reducer: Reducer<State, Action> = (state, action) => {
	if (action.computerMove === null) {
		if (state.isPredicting) {
			return state;
		}

		return {
			...state,
			currentMove: action.playerMove,
			isPredicting: true,
		};
	}

	const { playerMove, computerMove } = action;

	const result = getResult(playerMove, computerMove);
	let nextState: State = {
		...state,
		lastPlay: {
			playerMove,
			computerMove,
			result,
		},
		isPredicting: false,
		currentMove: null,
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

	const hasNotPlayedYet = state.lastPlay.playerMove === null;

	return (
		<section className="jjk-background h-full w-full flex flex-col justify-between items-center">
			<Scoreboard score={state.score} />

			<MainSection
				state={state}
				dispatch={dispatch}
			/>

			<footer className="h-32 lg:h-48 w-full flex justify-around">
				<PlayerAction
					onClick={() => dispatch({ playerMove: "ROCK", computerMove: null })}
					move="ROCK"
					hasNotPlayedYet={hasNotPlayedYet}
				/>
				<PlayerAction
					onClick={() => dispatch({ playerMove: "PAPER", computerMove: null })}
					move="PAPER"
					hasNotPlayedYet={hasNotPlayedYet}
				/>
				<PlayerAction
					onClick={() => dispatch({ playerMove: "SCISSORS", computerMove: null })}
					move="SCISSORS"
					hasNotPlayedYet={hasNotPlayedYet}
				/>
			</footer>
		</section>
	);
};

export default Index;
