import { useQuery } from "@apollo/react-hooks";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigationParamsList } from "App";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Text, View, ScrollView } from "react-native";
import { Post as PostType } from "types";
import SearchModal from "./SearchModal";
import Post from "./Post";

export interface GetPostsData {
	posts: PostType[];
}
export const GET_POSTS = gql`
	{
		posts {
			id
			author {
				username
				profilePictureURL
			}
			game {
				name
				thumbnailURL
			}
			caption
			date
			rating
			taggedUsers {
				username
				profilePictureURL
			}
		}
	}
`;

const DEBUG_testGame = {
	id: "266192",
	name: "Wingspan",
	publisher: "Stonemaier Games",
	yearPublished: 2019,
	thumbnailURL:
		"https://cf.geekdo-images.com/thumb/img/wvfZwwtcqpth4bgHnh4M-EhUCXg=/fit-in/200x150/pic4458123.jpg",
	minPlayers: 1,
	maxPlayers: 5,
	categories: ["Card Game", "Set Collection"]
};

interface Props {
	navigation: StackNavigationProp<StackNavigationParamsList, "Feed">;
	route: RouteProp<StackNavigationParamsList, "Feed">;
}

const Feed = ({ navigation }: Props): JSX.Element => {
	const { loading, error, data } = useQuery<GetPostsData>(GET_POSTS);
	const [gameSearchOpen, setGameSearchOpen] = useState<boolean>(false);
	if (loading) {
		return <Text>Loading...</Text>;
	}
	if (error) {
		console.error(error);
		return <Text>Error loading data</Text>;
	}
	if (data) {
		return (
			<>
				<SearchModal
					onDismiss={(): void => setGameSearchOpen(false)}
					onSubmit={(): void => {
						setGameSearchOpen(false);
						navigation.navigate("GameSearch");
					}}
					visible={gameSearchOpen}
				/>
				<View>
					{/* The text for this button kind of sucks, think about what to change that to */}
					<Button
						onPress={(): void => setGameSearchOpen(true)}
						title="Add a check-in"
					/>
					{/* DEBUG: Remove for actual release */}
					<Button
						onPress={(): void =>
							navigation.navigate("CheckIn", {
								game: DEBUG_testGame
							})
						}
						title="Check in form"
					/>
				</View>

				<ScrollView style={{ padding: 10, paddingBottom: 0 }}>
					{data.posts.map((post) => {
						return (
							<View key={post.id} style={{ marginBottom: 15 }}>
								<Post
									{...post}
									rating={parseFloat(post.rating)}
								/>
							</View>
						);
					})}
				</ScrollView>
			</>
		);
	}
	return (
		<Text style={{ textAlign: "center", fontSize: 18 }}>
			No posts yet. Try following more users to fill up your feed!
		</Text>
	);
};

export default Feed;
