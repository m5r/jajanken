import { FunctionComponent } from "react";

type Props = {
	score: {
		wins: number;
		ties: number;
		losses: number;
	};
};

const Score: FunctionComponent<{ title: "WINS" | "TIES" | "LOSSES"; value: number; }> = ({ title, value }) => (
	<div className="flex flex-col items-center w-1/3">
		<div>{title}</div>
		<div data-cy={title}>{value}</div>
	</div>
);

const Scoreboard: FunctionComponent<Props> = ({ score }) => (
	<header className="h-32 lg:h-48 flex flex-row w-full text-3xl lg:text-4xl font-pixel">
		<Score title="WINS" value={score.wins} />
		<Score title="TIES" value={score.ties} />
		<Score title="LOSSES" value={score.losses} />
	</header>
);

export default Scoreboard;
