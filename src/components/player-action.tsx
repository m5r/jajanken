import { FunctionComponent } from "react";

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

const PlayerAction: FunctionComponent<Props> = ({ onClick, move }) => (
	<img
		className="flex max-h-full w-auto justify-around cursor-pointer jjk-player-action"
		src={`data:image/png;base64,${base64Images[move]}`}
		onClick={onClick}
		alt={move}
	/>
);

export default PlayerAction;