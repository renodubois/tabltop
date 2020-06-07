import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { commonStackNavigatorStyles } from "../styles";

const Profile = () => {
	return (
		<View>
			<Text>Profile</Text>
		</View>
	);
};

const ProfileNavigator = createStackNavigator();

const ProfileScreen = ({}) => {
	return (
		<ProfileNavigator.Navigator screenOptions={commonStackNavigatorStyles}>
			<ProfileNavigator.Screen name="Profile" component={Profile} />
		</ProfileNavigator.Navigator>
	);
};

export default ProfileScreen;
