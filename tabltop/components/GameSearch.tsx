import React from "react";
import { View } from "react-native";
import { Game, SearchableItem } from "../types";
import Searcher from "./Seacher";

interface Props {
	games: Game[];
	query: string;
	onGameSelect: (id: string) => void;
	onTextChange: (newQuery: string) => void;
}

export const findGame = (query: string, games: Game[]): Game[] => {
	if (query === "") {
		return [];
	}

	const regex = new RegExp(`${query.trim()}`, "i");
	return games.filter((game) => game.name.search(regex) >= 0);
};

const GameSearch = ({
	games,
	query,
	onGameSelect,
	onTextChange,
}: Props): JSX.Element => {
	const searchData = findGame(query, games);
	// TODO: display a placeholder message before we search
	return (
		<View>
			<Searcher
				defaultValue={query}
				items={searchData.map(
					(game): SearchableItem => ({
						label: `${game.name} (${game.yearPublished})`,
						id: game.id,
						imageURL: game.thumbnailURL,
					})
				)}
				onChangeText={(query) => onTextChange(query)}
				onItemSelect={(id) => onGameSelect(id)}
			/>
		</View>
	);
};

export default GameSearch;
