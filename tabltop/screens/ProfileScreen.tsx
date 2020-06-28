import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { commonStackNavigatorStyles } from "../styles";
import ProfileWrapper from "../components/ProfileWrapper";

const ProfileNavigator = createStackNavigator();

const ProfileScreen = ({}) => {
	// TODO: default the userID to the currently logged in user @tasksforauth
	return (
		<ProfileNavigator.Navigator screenOptions={commonStackNavigatorStyles}>
			<ProfileNavigator.Screen name="Profile">
				{() => <ProfileWrapper userID="1" />}
			</ProfileNavigator.Screen>
		</ProfileNavigator.Navigator>
	);
};

export default ProfileScreen;
