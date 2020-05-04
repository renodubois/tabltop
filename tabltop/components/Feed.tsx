import { useQuery } from "@apollo/react-hooks";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import gql from "graphql-tag";
import { StackNavigationParamsList } from "App";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { Post } from "types";
import SearchModal from "./SearchModal";

export interface GetPostsData {
	posts: Post[];
}
export const GET_POSTS = gql`
	{
		posts {
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
`;

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
				</View>
				<View>
					{data.posts.map((post) => {
						return (
							<View key={post.id} style={{ padding: 10 }}>
								<Text>
									{post.author.username} was playing{" "}
									{post.game.name}
								</Text>
								<Text>{post.caption}</Text>
							</View>
						);
					})}
				</View>
			</>
		);
	}
	return <Text>No data found?</Text>;
};

export default Feed;
