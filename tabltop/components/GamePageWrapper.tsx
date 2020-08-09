import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { BaseProps, Game, Post } from "../types";
import ErrorOverlay from "./ErrorOverlay";
import GamePage from "./GamePage";
import LoadingOverlay from "./LoadingOverlay";

interface Props extends BaseProps<"GamePage"> {}

export const GET_GAME_PAGE_DATA = gql`
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
			averageRating
		}
		postsByGame(gameID: $gameID) {
			id
			author {
				id
				username
				profilePictureURL
			}
			game {
				id
				name
				thumbnailURL
			}
			caption
			date
			rating
			taggedUsers {
				id
				username
				profilePictureURL
			}
		}
	}
`;

export interface GameDataReturn {
	gameByID: Game;
	postsByGame: Post[];
}

const GamePageWrapper = ({ navigation, route }: Props) => {
	const { loading, error, data } = useQuery<GameDataReturn>(
		GET_GAME_PAGE_DATA,
		{
			variables: { gameID: route.params.gameID },
		}
	);
	if (loading) {
		return <LoadingOverlay />;
	}
	if (error) {
		return <ErrorOverlay error={error} />;
	}
	if (!data || (data && !data.gameByID)) {
		return <ErrorOverlay error="Couldn't fetch data for game" />;
	}
	return (
		<GamePage
			game={data.gameByID}
			posts={data.postsByGame}
			navigation={navigation}
			route={route}
		/>
	);
};

export default GamePageWrapper;
