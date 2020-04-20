import React from "react";
import { Image, Text, View } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from "../styles";
import { Game } from "../types";

interface Props {
	games: Game[];
	query: string;
	onGameSelect: (game: Game) => void;
	onTextChange: (newQuery: string) => void;
}

const findGame = (query: string, games: Game[]): Game[] => {
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
	onTextChange
}: Props): JSX.Element => {
	const searchData = findGame(query, games);
	return (
		<View>
			<Autocomplete
				containerStyle={Styles.gameSearchContainer}
				autoFocus={true}
				defaultValue={query}
				data={searchData}
				placeholder="Find a game"
				placeholderTextColor="#353535"
				onChangeText={(text): void => onTextChange(text)}
				renderItem={(params): JSX.Element => {
					const { item, index } = params;
					return (
						<TouchableOpacity
							accessible={true}
							accessibilityHint={
								"Selects this game to be used for check-in"
							}
							accessibilityRole="button"
							key={index}
							onPress={(): void => onGameSelect(item)}
							testID={`game-search-${item.name.toLowerCase()}`}
						>
							<View style={Styles.itemContainer}>
								<Image
									source={{ uri: item.thumbnailURL }}
									style={Styles.gameSearchItemImage}
								/>
								<Text style={Styles.gameSearchItemText}>
									{item.name} ({item.yearPublished})
								</Text>
							</View>
						</TouchableOpacity>
					);
				}}
				style={Styles.gameSearchInput}
			/>
		</View>
	);
};

export default GameSearch;
