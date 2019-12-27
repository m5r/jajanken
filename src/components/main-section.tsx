import { FunctionComponent } from "react";
import { Move, Result } from "../shared-types";

type Props = {
	lastPlayerMove: Move | null;
	lastComputerMove: Move | null;
	lastResult: Result | null;
};

const MainSection: FunctionComponent<Props> = ({ lastPlayerMove, lastComputerMove, lastResult }) => {
	if (lastPlayerMove === null || lastComputerMove === null || lastResult === null) {
		return (
			<main className="w-full flex flex-col text-center font-mono text-2xl">
				<div className="m-auto">Use the three buttons below to play</div>
				<div className="m-auto">Start playing and see how you do against this AI!</div>
			</main>
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
		<main className="w-full flex flex-col text-center font-mono text-2xl">
			<div className="m-auto">{lastPlayerMove} x {lastComputerMove}</div>
			<div className="m-auto">{resultText}</div>
		</main>
	);
};

export default MainSection;
