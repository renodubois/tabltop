import React from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import { BaseProps, Game, Post as PostType } from "../types";
import Post from "./Post";

interface Props extends BaseProps<"GamePage"> {
	game: Game;
	posts: PostType[];
}

const GamePage = ({ game, posts, navigation, route }: Props) => {
	const ratingContainerStyle: any = {
		width: 75,
		marginTop: 5,
		marginLeft: 30,
		alignSelf: "flex-start",
	};
	return (
		<View style={{ flex: 1, flexDirection: "column" }}>
			<View style={{ flex: 1 }}>
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
				<View style={{ padding: 15 }}>
					{/* Replace w/ currently logged in user @tasksforauth */}
					<Button
						onPress={() =>
							navigation.navigate("CheckIn", {
								game,
								userID: "1",
							})
						}
						title="Add a Check In"
					/>
				</View>
			</View>
			<View style={{ flex: 2 }}>
				<ScrollView style={{ padding: 10, paddingBottom: 0 }}>
					{posts.map((post) => {
						return (
							<View key={post.id} style={{ marginBottom: 15 }}>
								<Post
									{...post}
									rating={parseFloat(post.rating)}
									navigation={navigation}
									route={route}
								/>
							</View>
						);
					})}
				</ScrollView>
			</View>
		</View>
	);
};

export default GamePage;
