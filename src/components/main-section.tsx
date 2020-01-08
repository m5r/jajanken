import { FunctionComponent, useEffect, useState } from "react";

import { useMLP } from "../mlp/hook";

import { Action, State } from "../pages";

type Props = {
	state: State;
	dispatch: (action: Action) => void;
};

const MainStyle: FunctionComponent = ({ children }) => (
	<main className="w-full flex flex-col text-center font-mono text-2xl">
		{children}
	</main>
);

const MainSection: FunctionComponent<Props> = ({ state, dispatch }) => {
	const lastPlayerMove = state.lastPlay.playerMove;
	const lastComputerMove = state.lastPlay.computerMove;
	const lastResult = state.lastPlay.result;
	const { predict, train } = useMLP();
	const [shouldDisplayLoading, setShouldDisplayLoading] = useState<boolean>(false);

	useEffect(() => {
		async function predictAndTrain() {
			if (state.isPredicting) {
				const playerMove = state.currentMove!;
				const computerMove = await predict(lastPlayerMove);
				dispatch({ playerMove, computerMove });

				setShouldDisplayLoading(false);

				train({ lastPlayerMove, lastResult, playerMove });
			}
		}

		predictAndTrain();

		let timeout: NodeJS.Timeout;
		if (state.isPredicting) {
			// only display "is predicting" message if the user has been waiting for too long
			timeout = setTimeout(() => setShouldDisplayLoading(true), 300);
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [state.currentMove]);

	if (lastPlayerMove === null || lastComputerMove === null || lastResult === null) {
		return (
			<MainStyle>
				<div className="m-auto">Use the three buttons below to play</div>
				<div className="m-auto">Start playing and see how you do against this AI!</div>
			</MainStyle>
		);
	}

	if (state.isPredicting && shouldDisplayLoading) {
		return (
			<MainStyle>Thinking about my next move...</MainStyle>
		);
	}

	let resultText = "";
	switch (lastResult) {
		case "WIN":
			resultText = "You win but don't let it get to your head.";
			break;
		case "LOSS":
			resultText = "You lose, 流石そのＡＩ！ \uD83E\uDDEA";
			break;
		case "TIE":
			resultText = "It's a tie \uD83E\uDD37";
			break;
	}

	return (
		<MainStyle>
			<div className="m-auto">{lastPlayerMove} x {lastComputerMove}</div>
			<div className="m-auto">{resultText}</div>
		</MainStyle>
	);
};

export default MainSection;
