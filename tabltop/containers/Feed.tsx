import React from "react";
import { Button, Text, View } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Post } from "types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationParamsList } from "App";

interface GetPostsData {
    posts: Post[];
}
const GET_POSTS = gql`
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

const Feed = ({ navigation, route }: Props) => {
    const { loading, error, data } = useQuery<GetPostsData>(GET_POSTS);
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
                <View>
                    {/* The text for this button kind of sucks, think about what to change that to */}
                    <Button
                        onPress={() => navigation.navigate("CheckIn")}
                        title="Add a check-in"
                    />
                </View>
                <View>
                    {data.posts.map(post => {
                        return (
                            <View key={post.id}>
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
