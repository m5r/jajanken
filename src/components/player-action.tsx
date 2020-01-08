import { FunctionComponent, useRef, useState } from "react";

import { Move } from "../shared-types";

type Props = {
	onClick: () => void;
	move: Move;
	hasNotPlayedYet: boolean;
}

const base64Images: Record<Move, string> = {
	ROCK: require("../../public/static/images/rock.png.b64"),
	PAPER: require("../../public/static/images/paper.png.b64"),
	SCISSORS: require("../../public/static/images/scissors.png.b64"),
};

const PlayerAction: FunctionComponent<Props> = ({ onClick, move, hasNotPlayedYet }) => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [shouldTranslateToTop, setShouldTranslateToTop] = useState<Boolean>(false);
	let className = "flex max-h-full w-auto justify-around cursor-pointer jjk-player-action";
	if (shouldTranslateToTop) {
		className += " jjk-bump";
	}
	if (hasNotPlayedYet) {
		className += " jjk-click-here-to-play";
	}

	return (
		<img
			data-cy={move}
			className={className}
			src={`data:image/png;base64,${base64Images[move]}`}
			onClick={() => {
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
				}

				onClick();
				setShouldTranslateToTop(true);
				timeoutRef.current = setTimeout(() => setShouldTranslateToTop(false), 250);
			}}
			alt={move}
		/>
	);
};

export default PlayerAction;