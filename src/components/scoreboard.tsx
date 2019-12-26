import { FunctionComponent } from "react";

type Props = {
	score: {
		wins: number;
		ties: number;
		losses: number;
	};
};

const Score: FunctionComponent<{ title: string; value: number; }> = ({ title, value }) => (
	<div className="flex flex-col items-center">
		<div>{title}</div>
		<div>{value}</div>
	</div>
);

const Scoreboard: FunctionComponent<Props> = ({ score }) => (
	<header className="flex flex-row w-full justify-around">
		<Score title="Wins" value={score.wins} />
		<Score title="Ties" value={score.ties} />
		<Score title="Losses" value={score.losses} />
	</header>
);

export default Scoreboard;
