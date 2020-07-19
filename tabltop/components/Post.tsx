import React from "react";
import {
	Image,
	StyleProp,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Rating } from "react-native-ratings";
import { BaseProps, Game, User } from "../types";

// TODO: make these actual types
interface Props extends BaseProps<"Feed" | "Profile"> {
	game: Game;
	author: User;
	date: string;
	rating: number;
	taggedUsers: User[];
	caption: string;
}

const MAX_TITLE_LENGTH = 24;

const generateRelativeTime = (timestamp: number): string => {
	const now = Date.now();
	let diff = now - timestamp;
	diff = diff / 1000;
	let value = "";
	let unit = "";
	if (diff < 60) {
		return "now";
	} else if (diff < 3600) {
		value = Math.round(diff / 60).toString();
		unit = "m";
	} else if (diff < 3600 * 24) {
		value = Math.round(diff / 3600).toString();
		unit = "h";
	} else if (diff < 3600 * 24 * 14) {
		value = Math.round(diff / (3600 * 24)).toString();
		unit = "d";
	} else if (diff < 3600 * 24 * 7 * 4) {
		value = Math.round(diff / (3600 * 24 * 7)).toString();
		unit = "w";
	} else if (diff < 3600 * 24 * 7 * 52) {
		value = Math.round(diff / (3600 * 24 * 30)).toString();
		unit = "mo";
	} else {
		value = Math.round(diff / (3600 * 24 * 365)).toString();
		unit = "y";
	}
	return `${value}${unit}`;
};

const generateTaggedUsers = (users: User[], navigation: any): JSX.Element[] => {
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
					overflow: "visible",
				}}
				key={i}
				onPress={() =>
					navigation.push("Profile", { userID: users[i].id })
				}
			>
				<Image
					source={{ uri: users[i].profilePictureURL }}
					style={{
						width: 40,
						height: 40,
						borderRadius: 25,
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
					alignItems: "center",
				}}
				onPress={() => null}
				key={3}
			>
				<Text style={{ fontWeight: "bold" }}>
					+{users.length - photosToGenerate}
				</Text>
			</TouchableOpacity>
		);
	}
	return photoElements;
};

const Post = ({
	game,
	author,
	date,
	rating,
	taggedUsers,
	caption,
	navigation,
}: Props) => {
	let gameName = game.name;
	const gameStyles: StyleProp<TextStyle> = {
		fontSize: 24,
		fontWeight: "bold",
		// fontFamily: "YoungSerif"
	};
	const ratingContainerStyle: any = {
		width: 75,
		marginTop: 5,
		marginLeft: 10,
		alignSelf: "flex-start",
	};
	const titleContainerStyle: StyleProp<ViewStyle> = {
		flex: 1,
		flexDirection: "column",
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
				shadowColor: "#000",
				shadowOffset: { height: 5, width: 5 },
				shadowOpacity: 0.2,
				shadowRadius: 5,
			}}
		>
			<View
				style={{
					padding: 20,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						paddingBottom: 15,
					}}
				>
					<View
						style={{ flexDirection: "row", alignItems: "center" }}
					>
						<TouchableOpacity
							style={{
								width: 40,
								height: 40,
								borderRadius: 25,
								marginRight: 10,
								overflow: "visible",
							}}
							onPress={() =>
								navigation.push("Profile", {
									userID: author.id,
								})
							}
						>
							<Image
								source={{ uri: author.profilePictureURL }}
								style={{
									width: 40,
									height: 40,
									borderRadius: 25,
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ marginRight: 8 }}
							onPress={() =>
								navigation.push("Profile", {
									userID: author.id,
								})
							}
						>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "bold",
								}}
							>
								{author.username}
							</Text>
						</TouchableOpacity>
						{/* TODO: fix line height issue here, this slightly not center aligned */}
						<Text style={{ color: "#3E4C59", lineHeight: 0 }}>
							{generateRelativeTime(parseInt(date))}
						</Text>
					</View>
					<View style={{ flexDirection: "row" }}>
						{generateTaggedUsers(taggedUsers, navigation)}
					</View>
				</View>
				<View style={{ flexDirection: "row", paddingBottom: 15 }}>
					<View style={titleContainerStyle}>
						<View style={{ marginRight: 10 }}>
							<Text style={gameStyles}>{gameName}</Text>
						</View>
						<Rating
							style={ratingContainerStyle}
							readonly
							startingValue={rating}
							imageSize={20}
							tintColor="#E6F6FF"
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
								marginRight: 20,
							}}
						/>
					</View>
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					marginTop: 20,
					alignItems: "stretch",
					justifyContent: "center",
				}}
			>
				<View
					style={{
						flex: 1,
						borderColor: "#9AA5B1",
						borderTopWidth: 1,
						borderRightWidth: 1,
					}}
				>
					<TouchableOpacity
						onPress={() => console.log("like")}
						style={{
							alignItems: "center",
							justifyContent: "center",
							padding: 10,
						}}
					>
						<Text>Like</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						flex: 1,
						borderColor: "#9AA5B1",
						borderTopWidth: 1,
					}}
				>
					<TouchableOpacity
						onPress={() => console.log("comment")}
						style={{
							alignItems: "center",
							justifyContent: "center",
							padding: 10,
						}}
					>
						<Text>Comment</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default Post;
