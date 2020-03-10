import { useQuery } from "@apollo/react-hooks";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { gql } from "apollo-boost";
import { StackNavigationParamsList } from "App";
import React, { useState } from "react";
import { Button, Modal, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Post } from "types";
import Styles from "../styles";
import SearchModal from "./SearchModal";

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
                    onDismiss={() => setGameSearchOpen(false)}
                    onSubmit={() => {
                        setGameSearchOpen(false);
                        navigation.navigate("GameSearch");
                    }}
                    visible={gameSearchOpen}
                />
                <View>
                    {/* The text for this button kind of sucks, think about what to change that to */}
                    <Button
                        onPress={() => setGameSearchOpen(true)}
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
