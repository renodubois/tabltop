import React from "react";
import { Text, View, Image } from "react-native";
import { BaseProps, Game } from "../types";
import { Rating } from "react-native-ratings";

interface Props extends BaseProps<"GamePage"> {
	game: Game;
}

const GamePage = ({ game }: Props) => {
	const ratingContainerStyle: any = {
		width: 75,
		marginTop: 5,
		marginLeft: 30,
		alignSelf: "flex-start",
	};
	return (
		<View>
			<View
				style={{
					marginTop: 30,
					marginLeft: 10,
					marginRight: 10,
					flexDirection: "row",
					backgroundColor: "#E6F6FF",
					borderRadius: 10,
					overflow: "hidden",
				}}
			>
				<Image
					source={{ uri: game.thumbnailURL }}
					style={{ width: 150, height: 150 }}
				/>
				<View style={{ marginLeft: 10 }}>
					<View style={{ flexDirection: "row" }}>
						<Text
							style={{
								fontSize: 24,
								fontWeight: "bold",
								lineHeight: 48,
							}}
						>
							{game.name}
						</Text>
						<Text
							style={{
								paddingTop: 3,
								fontSize: 14,
								fontStyle: "italic",
								color: "#52606D",
								paddingLeft: 10,
								lineHeight: 48,
							}}
						>
							({game.yearPublished})
						</Text>
					</View>
					<Text
						style={{
							fontSize: 18,
							fontVariant: ["small-caps"],
							color: "#3E4C59",
						}}
					>
						{game.publisher.toLowerCase()}
					</Text>
				</View>
			</View>
			<Rating
				style={ratingContainerStyle}
				readonly
				startingValue={parseFloat(game.averageRating)}
				imageSize={20}
				tintColor="#E6F6FF"
			/>
		</View>
	);
};

export default GamePage;
