import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { commonStackNavigatorStyles } from "../styles";
import ProfileWrapper from "../components/ProfileWrapper";
import { StackNavigationParamsList } from "../App";

const ProfileNavigator = createStackNavigator<StackNavigationParamsList>();

const ProfileScreen = ({}) => {
	// TODO: default the userID to the currently logged in user @tasksforauth
	return (
		<ProfileNavigator.Navigator screenOptions={commonStackNavigatorStyles}>
			<ProfileNavigator.Screen
				name="Profile"
				component={ProfileWrapper}
				initialParams={{ userID: "1" }}
			/>
		</ProfileNavigator.Navigator>
	);
};

export default ProfileScreen;
