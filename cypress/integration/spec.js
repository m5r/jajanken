describe("Jajanken", () => {
	it("plays the game", () => {
		cy.visit("http://localhost:9029/");

		const MOVES = ["ROCK", "PAPER", "SCISSORS"];
		const PLAYS = 100;

		for (let i = 0; i < PLAYS; i++) {
			const moveToPlay = MOVES[Math.floor(Math.random() * 3)];
			cy.get(`[data-cy='${moveToPlay}']`).click();
		}

		cy.wait(500);

		const RESULTS = ["WINS", "TIES", "LOSSES"];
		let actualPlays = 0;
		RESULTS.forEach((result, index) => {
			cy.get(`[data-cy='${result}']`).invoke("text")
				.then(value => actualPlays += Number.parseInt(value, 10))
				.then(() => {
					if (index === RESULTS.length - 1) {
						expect(PLAYS).to.equal(actualPlays);
					}
				});
		});
	});
});