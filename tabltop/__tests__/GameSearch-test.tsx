import { render } from "@testing-library/react-native";
import React from "react";
import GameSearch from "../components/GameSearch";

it("renders game items correctly", () => {
	const testGames = [
		{
			id: "266192",
			name: "Wingspan",
			publisher: "Stonemaier Games",
			yearPublished: 2019,
			thumbnailURL:
				"https://cf.geekdo-images.com/thumb/img/wvfZwwtcqpth4bgHnh4M-EhUCXg=/fit-in/200x150/pic4458123.jpg",
			minPlayers: 1,
			maxPlayers: 5,
			categories: ["Card Game", "Set Collection"]
		}
	];
	const { queryByRole } = render(
		<GameSearch
			games={testGames}
			onGameSelect={jest.fn()}
			onTextChange={jest.fn()}
			query="wing"
		/>
	);
	const gameItem = queryByRole("button");
	expect(gameItem).toBeTruthy();
});
