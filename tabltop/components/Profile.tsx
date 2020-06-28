import React from "react";
import { User } from "../types";
import { View, Text, Image } from "react-native";
import Feed from "./Feed";

interface ProfileProps {
	user: User;
}

const Profile = ({ user }: ProfileProps) => {
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
			</View>
			<View style={{ flex: 2 }}>
				<Text>FEED PLACEHOLDER</Text>
			</View>
		</>
	);
};

export default Profile;
