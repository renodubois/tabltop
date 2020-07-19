import React from "react";
import { User, Post as PostType, BaseProps } from "../types";
import { View, Text, Image, ScrollView, Button } from "react-native";
import Feed from "./Feed";
import Post from "./Post";

interface ProfileProps extends BaseProps<"Profile"> {
	user: User;
	posts: PostType[];
}

const Profile = ({ user, posts, navigation, route }: ProfileProps) => {
	return (
		<>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					backgroundColor: "#fff"
				}}
			>
				<View style={{ marginTop: 40 }}>
					<Image
						source={{ uri: user.profilePictureURL }}
						style={{ height: 100, width: 100, borderRadius: 100 }}
					/>
				</View>
				<Text
					style={{
						fontSize: 24,
						fontWeight: "bold"
					}}
				>
					{user.username}
				</Text>
				<View style={{ paddingTop: 10 }}>
					<Text style={{ fontStyle: "italic" }}>{user.bio}</Text>
				</View>
				{user.followers ? (
					<Text>Followers: {user.followers.length}</Text>
				) : null}
				{/* check for currently logged in user @tasksforauth */}
				{route.params.userID === "1" ? (
					<Button
						onPress={() => navigation.navigate("EditProfile")}
						title="Edit Profile"
					/>
				) : null}
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
		</>
	);
};

export default Profile;
