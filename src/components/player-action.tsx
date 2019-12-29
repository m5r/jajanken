import { FunctionComponent, useState } from "react";

import { Move } from "../shared-types";

type Props = {
	onClick: () => void;
	move: Move;
}

const base64Images: Record<Move, string> = {
	ROCK: require("../../public/static/images/rock.png.b64"),
	PAPER: require("../../public/static/images/paper.png.b64"),
	SCISSORS: require("../../public/static/images/scissors.png.b64"),
};

const PlayerAction: FunctionComponent<Props> = ({ onClick, move }) => {
	const [shouldTranslateToTop, setShouldTranslateToTop] = useState<Boolean>(false);

	return (
		<img
			className={`flex max-h-full w-auto justify-around cursor-pointer jjk-player-action ${shouldTranslateToTop ? "jjk-bump" : ""}`}
			src={`data:image/png;base64,${base64Images[move]}`}
			onClick={() => {
				onClick();
				setShouldTranslateToTop(true);
			}}
			onTransitionEnd={() => setShouldTranslateToTop(false)}
			alt={move}
		/>
	);
};

export default PlayerAction;