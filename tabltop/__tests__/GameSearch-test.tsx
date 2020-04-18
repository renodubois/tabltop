import React from "react";
import renderer, { act } from "react-test-renderer";
import GameSearch from "../components/GameSearch";

it("renders properly", () => {
	renderer.create(
		<GameSearch
			games={[]}
			onGameSelect={jest.fn()}
			onTextChange={jest.fn()}
			query=""
		/>
	);
});
