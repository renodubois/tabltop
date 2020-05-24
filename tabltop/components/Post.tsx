import React from "react";
import {
	Text,
	View,
	Image,
	StyleProp,
	TextStyle,
	ViewStyle
} from "react-native";
import StarRating from "react-native-star-rating";
import { Game, User } from "../types";
import { TouchableOpacity } from "react-native-gesture-handler";

// TODO: make these actual types
interface Props {
	game: Game;
	author: User;
	date: string;
	rating: number;
	taggedUsers: User[];
	caption: string;
}

const MAX_TITLE_LENGTH = 24;

const generateTaggedUsers = (users: User[]): JSX.Element[] => {
	const photoElements: JSX.Element[] = [];
	if (users.length <= 0) {
		return photoElements;
	}
	let photosToGenerate = users.length;
	if (users.length > 3) {
		photosToGenerate = 3;
	}
	for (let i = 0; i < photosToGenerate; i++) {
		// TODO: figure out how to overlap TouchableOpacity components
		// TODO: tapping on an icon of a user should navigate to their profile
		photoElements.push(
			<TouchableOpacity
				style={{
					width: 40,
					height: 40,
					borderRadius: 25,
					overflow: "visible"
				}}
				key={i}
				onPress={() => null}
			>
				<Image
					source={{ uri: users[i].profilePictureURL }}
					style={{
						width: 40,
						height: 40,
						borderRadius: 25
					}}
				/>
			</TouchableOpacity>
		);
	}
	if (users.length > 3) {
		photoElements.push(
			// TODO: tapping here should open a modal with all tagged users
			<TouchableOpacity
				style={{
					height: 40,
					width: 40,
					borderRadius: 25,
					backgroundColor: "#9AA5B1",
					justifyContent: "center",
					alignItems: "center"
				}}
				onPress={() => null}
			>
				<Text style={{ fontWeight: "bold" }}>
					+{users.length - photosToGenerate}
				</Text>
			</TouchableOpacity>
		);
	}
	return photoElements;
};

const Post = ({ game, author, date, rating, taggedUsers, caption }: Props) => {
	console.log(game);
	let gameName = game.name;
	const gameStyles: StyleProp<TextStyle> = {
		fontSize: 24,
		fontWeight: "bold",
		fontFamily: "YoungSerif"
	};
	const ratingContainerStyle: StyleProp<ViewStyle> = {
		width: 75,
		alignSelf: "center"
	};
	const titleContainerStyle: StyleProp<ViewStyle> = {
		flex: 1,
		flexDirection: "row"
	};
	if (gameName.length > MAX_TITLE_LENGTH) {
		gameName = gameName.substr(0, MAX_TITLE_LENGTH) + "...";
		gameStyles.fontSize = 20;
		ratingContainerStyle.marginTop = 5;
		ratingContainerStyle.alignSelf = "flex-start";
		titleContainerStyle.flexDirection = "column";
	}

	return (
		<View
			style={{
				backgroundColor: "#E6F6FF",
				borderRadius: 5,
				padding: 20,
				shadowColor: "#000",
				shadowOffset: { height: 5, width: 5 },
				shadowOpacity: 0.2,
				shadowRadius: 5
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingBottom: 15
				}}
			>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Image
						source={{ uri: author.profilePictureURL }}
						style={{
							width: 40,
							height: 40,
							borderRadius: 25,
							marginRight: 10
						}}
					/>
					<View style={{ marginRight: 8 }}>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "bold"
							}}
						>
							{author.username}
						</Text>
					</View>
					{/* TODO: fix line height issue here, this slightly not center aligned */}
					<Text style={{ color: "#3E4C59", lineHeight: 0 }}>
						{date}
					</Text>
				</View>
				<View style={{ flexDirection: "row" }}>
					{generateTaggedUsers(taggedUsers)}
				</View>
			</View>
			<View style={{ flexDirection: "row", paddingBottom: 15 }}>
				<View style={titleContainerStyle}>
					<View style={{ marginRight: 10 }}>
						<Text style={gameStyles}>{gameName}</Text>
					</View>
					<StarRating
						containerStyle={ratingContainerStyle}
						disabled
						rating={rating}
						starSize={20}
						fullStarColor="#FFCA1A"
					/>
				</View>
			</View>
			<View style={{ flexDirection: "row" }}>
				<View style={{ flex: 4 }}>
					<Text style={{ fontStyle: "italic" }}>{caption}</Text>
				</View>
				{/* TODO: revisit where the icon is positioned on long names */}
				<View style={{ flex: 1, marginLeft: 10, marginTop: -30 }}>
					<Image
						source={{ uri: game.thumbnailURL }}
						style={{
							height: 70,
							width: 70,
							borderRadius: 5,
							marginRight: 20
						}}
					/>
				</View>
			</View>
			{/* Photos */}
			{/* Interaction (like, comment etc) */}
		</View>
	);
};

export default Post;
