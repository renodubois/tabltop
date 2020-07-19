import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { BaseProps, Game } from "../types";
import ErrorOverlay from "./ErrorOverlay";
import GamePage from "./GamePage";
import LoadingOverlay from "./LoadingOverlay";

interface Props extends BaseProps<"GamePage"> {}

const GET_GAME_BY_ID = gql`
	query GetGameById($gameID: String) {
		gameByID(gameID: $gameID) {
			id
			name
			thumbnailURL
			publisher
			yearPublished
			categories
			minPlayers
			maxPlayers
		}
	}
`;

interface GameDataReturn {
	gameByID: Game;
}

const GamePageWrapper = ({ navigation, route }: Props) => {
	console.log(route.params.gameID);
	const { loading, error, data } = useQuery<GameDataReturn>(GET_GAME_BY_ID, {
		variables: { gameID: route.params.gameID },
	});
	if (loading) {
		return <LoadingOverlay />;
	}
	if (error) {
		return <ErrorOverlay error={error} />;
	}
	if (!data || (data && !data.gameByID)) {
		return <ErrorOverlay error="Couldn't fetch data for game" />;
	}
	console.log("DATA HERE", data);
	return (
		<GamePage game={data.gameByID} navigation={navigation} route={route} />
	);
};

export default GamePageWrapper;