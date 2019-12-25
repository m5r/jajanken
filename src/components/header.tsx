import { FunctionComponent } from "react";

type Props = {
	score: {
		wins: number;
		ties: number;
		losses: number;
	};
};

const Header: FunctionComponent<Props> = ({ score }) => (
	<header className="flex flex-row w-full justify-between">
		<div>{score.wins} Wins</div>
		<div>{score.ties} Ties</div>
		<div>{score.losses} Losses</div>
	</header>
);

export default Header;
