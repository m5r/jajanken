import { FunctionComponent } from "react";

type Props = {
	onClick: () => void;
	action: "rock" | "paper" | "scissors";
}

const PlayerAction: FunctionComponent<Props> = ({ onClick, action }) => (
	<button onClick={onClick} className="flex justify-center cursor-pointer jjk-player-action">
		<img className="max-h-full" src={`/static/images/${action}.png`} />
	</button>
);

export default PlayerAction;