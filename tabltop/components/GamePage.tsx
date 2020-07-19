import React from "react";
import { Text, View } from "react-native";
import { BaseProps, Game } from "../types";

interface Props extends BaseProps<"GamePage"> {
	game: Game;
}

const GamePage = ({ game }: Props) => {
	return (
		<View>
			<Text>{game.name}</Text>
		</View>
	);
};

export default GamePage;
