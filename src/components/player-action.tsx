import { FunctionComponent } from "react";

type Props = {
	onClick: () => void;
	action: "rock" | "paper" | "scissors";
}

const PlayerAction: FunctionComponent<Props> = ({ onClick, action }) => (
	<img onClick={onClick} className="max-h-full" src={`/static/images/${action}.png`} />
);

export default PlayerAction;