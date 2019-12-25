import { useRef } from "react";

import MLP from "./mlp";

export function useMLP(): MLP {
	const mlp = new MLP({ input: 3, hidden: 3, output: 3, learningRate: 0.1, iterations: 300 });
	const ref = useRef<MLP>(mlp);

	return ref.current;
}
