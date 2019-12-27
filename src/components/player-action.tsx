import { FunctionComponent } from "react";

type Props = {
	onClick: () => void;
	action: "rock" | "paper" | "scissors";
}

const PlayerAction: FunctionComponent<Props> = ({ onClick, action }) => (
	<img
		className="flex max-h-full w-auto justify-around cursor-pointer jjk-player-action"
		src={`/static/images/${action}.png`}
		onClick={onClick}
	/>
);

export default PlayerAction;