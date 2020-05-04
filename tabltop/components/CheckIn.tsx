import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import {
	ScrollView,
	TextInput,
	TouchableOpacity
} from "react-native-gesture-handler";
import { BaseProps, Game } from "../types";
import CheckInOptionalItems from "./CheckInOptionalItems";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GET_POSTS, GetPostsData } from "./Feed";

type Props = BaseProps<"CheckIn">;
interface GameDataReturn {
	games: Game[];
}
interface CheckInFormData {
	game: Game;
	caption: string;
	rating: number;
}

const CREATE_POST = gql`
	mutation CreatePost($post: CreatePostInput!) {
		createPost(postInfo: $post) {
			post {
				id
				author {
					username
				}
				game {
					name
				}
				caption
			}
		}
	}
`;

const CheckIn = ({ navigation, route }: Props): JSX.Element => {
	const [formData, setFormData] = useState<CheckInFormData>({
		caption: "",
		rating: 1,
		game: route.params.game
	});
	const [createPost] = useMutation(CREATE_POST, {
		update(cache, { data: { createPost } }) {
			console.log("create post data", createPost);
			const data = cache.readQuery<GetPostsData>({ query: GET_POSTS });
			if (!data) {
				console.error("NO POST DATA");
				return;
			}
			console.log("example data", data.posts[0]);
			cache.writeQuery({
				query: GET_POSTS,
				data: { posts: data.posts.concat([createPost.post]) }
			});
		}
	});
	if (!formData.game) {
		return (
			<View>
				<Text>game not found, something went wrong</Text>
			</View>
		);
	}
	// TODO: fix border radius when scrolling overflow gets enabled
	const caption = (
		<TextInput
			value={formData.caption}
			onChangeText={(caption): void =>
				setFormData({ ...formData, caption })
			}
			style={{
				marginTop: 30,
				marginLeft: 10,
				marginRight: 10,
				borderRadius: 10,
				padding: 14,
				paddingTop: 14,
				fontSize: 18,
				backgroundColor: "#FFFFFF",
				height: 110,
				textAlignVertical: "top"
			}}
			multiline
			numberOfLines={4}
			// autoFocus NOTE: re-enable this when not doing dev?
			placeholder="How was this game?"
		/>
	);
	const rating = (
		<View
			style={{
				marginTop: 30,
				marginLeft: 15,
				marginRight: 25,
				width: "100%"
			}}
		>
			<Text style={{ fontSize: 14, color: "#353535", marginBottom: 25 }}>
				RATING
			</Text>
			<View
				style={{
					flexDirection: "row"
				}}
			>
				<Slider
					minimumValue={1}
					maximumValue={5}
					onValueChange={(rating): void =>
						setFormData({ ...formData, rating })
					}
					step={0.25}
					style={{ flex: 2 }}
					thumbTintColor="#0552B5"
				/>
				<View
					style={{
						flexDirection: "row",
						flex: 1,
						paddingLeft: 45,
						alignSelf: "center"
					}}
				>
					<Text
						style={{
							fontSize: 28,
							fontWeight: "bold",
							lineHeight: 35,
							minWidth: 62,
							textAlign: "right"
						}}
					>
						{formData.rating}
					</Text>
					<Text style={{ fontSize: 18, lineHeight: 40 }}>/5.0</Text>
				</View>
			</View>
		</View>
	);
	const submitButton = (
		<View style={{ justifyContent: "flex-end" }}>
			<TouchableOpacity
				onPress={(): void => {
					createPost({
						variables: {
							post: {
								gameId: formData.game.id,
								caption: formData.caption,
								authorId: "1" // TODO: put currently logged in user here @tasksforauth
							}
						}
					});
					navigation.navigate("Feed");
				}}
				style={{
					width: "100%",
					// TODO: look into making this a different shade of blue, or another color entirely.
					// It doesn't look _great_ with the dark blue header
					backgroundColor: "#47A3F3",
					paddingTop: 22,
					// TODO: this should be variable based on iPhone notches
					paddingBottom: 36
				}}
			>
				<Text
					style={{
						width: "100%",
						color: "#ffffff",
						// TODO: add inset shadow
						fontWeight: "bold",
						fontSize: 24,
						textAlign: "center",
						letterSpacing: 2
					}}
				>
					CHECK IN
				</Text>
			</TouchableOpacity>
		</View>
	);
	return (
		<>
			<ScrollView>
				<View
					style={{
						marginTop: 30,
						marginLeft: 10,
						marginRight: 10,
						flexDirection: "row",
						backgroundColor: "#E6F6FF",
						borderRadius: 10,
						overflow: "hidden"
					}}
				>
					<Image
						source={{ uri: formData.game.thumbnailURL }}
						style={{ width: 100, height: 100 }}
					/>
					<View style={{ marginLeft: 10 }}>
						<View style={{ flexDirection: "row" }}>
							<Text
								style={{
									fontSize: 24,
									fontWeight: "bold",
									lineHeight: 48
								}}
							>
								{formData.game.name}
							</Text>
							<Text
								style={{
									paddingTop: 3,
									fontSize: 14,
									fontStyle: "italic",
									color: "#52606D",
									paddingLeft: 10,
									lineHeight: 48
								}}
							>
								({formData.game.yearPublished})
							</Text>
						</View>
						<Text
							style={{
								fontSize: 18,
								fontVariant: ["small-caps"],
								color: "#3E4C59"
							}}
						>
							{formData.game.publisher.toLowerCase()}
						</Text>
					</View>
				</View>
				{caption}
				{rating}
				<CheckInOptionalItems />
			</ScrollView>
			{submitButton}
		</>
	);
};

export default CheckIn;
