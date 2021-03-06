import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { BaseProps, Game } from "types";
import ErrorOverlay from "./ErrorOverlay";
import GameSearch from "./GameSearch";
import LoadingOverlay from "./LoadingOverlay";
import Styles from "../styles";

type Props = BaseProps<"Feed">;
// TODO: rename this (or the other GameDataReturn)
export interface GameDataReturn {
	searchGames: Game[];
}
export const GET_GAMES = gql`
	query GetGames($query: String) {
		searchGames(query: $query) {
			id
			name
			publisher
			yearPublished
			thumbnailURL
		}
	}
`;

const GameSearchWrapper = ({ navigation }: Props): JSX.Element => {
	const [query, setQuery] = useState<string>("");
	const { loading, error, data } = useQuery<GameDataReturn>(GET_GAMES, {
		variables: { query },
	});
	let ResultsError: React.ReactNode | null = null;
	if (error) {
		return <ErrorOverlay error={error} />;
	}
	if (!loading) {
		if ((data && data.searchGames.length === 0) || !data) {
			ResultsError = (
				<View style={{ alignSelf: "center", paddingTop: 30 }}>
					<Text style={Styles.searchFailureText}>
						No results found.
					</Text>
				</View>
			);
		}
	}
	return (
		<>
			<View style={{ backgroundColor: "white" }}>
				<GameSearch
					games={data && data.searchGames ? data.searchGames : []}
					query={query}
					onGameSelect={(gameId: string): void => {
						if (!data) {
							// BAD ERROR
							return;
						}
						const selectedGame = data.searchGames.find(
							(game) => game.id === gameId
						);
						if (!selectedGame) {
							// BAD ERROR
							return;
						}
						return navigation.navigate("CheckIn", {
							game: selectedGame,
							userID: "1",
						});
					}}
					onTextChange={(newQuery: string): void =>
						setQuery(newQuery)
					}
				/>
			</View>
			{loading ? <LoadingOverlay /> : null}
			{ResultsError}
		</>
	);
};

export default GameSearchWrapper;
