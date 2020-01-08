import { NextPage } from "next";
import { useReducer, Reducer, useEffect } from "react";

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
	lastPlay: {
		playerMove: Move | null;
		computerMove: Move | null;
		result: Result | null;
	};
	currentMove: Move | null;
	isPredicting: boolean;
};

type Action = {
	playerMove: Move | null;
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

const reducer: Reducer<State, Action> = (state, action: Action) => {
	if (action.playerMove !== null) {
		return {
			...state,
			currentMove: action.playerMove,
			isPredicting: true,
		}
	}

	if (action.computerMove !== null) {
		const playerMove = state.currentMove!;
		const computerMove = action.computerMove;

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
	}

	throw new Error("Unreachable code");
};

const Index: NextPage = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { predict, train } = useMLP();

	useEffect(() => {
		async function ddd() {
			if (state.isPredicting) {
				const computerMove = await predict(state.lastPlay.playerMove);
				console.log("computerMove", computerMove);
				dispatch({ computerMove, playerMove: null });

				const lastPlayerMove = state.lastPlay.playerMove;
				const lastResult = state.lastPlay.result;
				const playerMove = state.currentMove!;
				train({ lastPlayerMove, lastResult, playerMove });
			}
		}

		ddd();
	}, [state.currentMove]);

	const hasNotPlayedYet = state.lastPlay.playerMove === null;

	return (
		<section className="jjk-background h-full w-full flex flex-col justify-between items-center">
			<Scoreboard score={state.score} />

			<MainSection
				lastPlayerMove={state.lastPlay.playerMove}
				lastComputerMove={state.lastPlay.computerMove}
				lastResult={state.lastPlay.result}
				isPredicting={state.isPredicting}
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
