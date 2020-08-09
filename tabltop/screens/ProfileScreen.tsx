import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StackNavigationParamsList } from "../types";
import EditProfileWrapper from "../components/EditProfileWrapper";
import ProfileWrapper from "../components/ProfileWrapper";
import { commonStackNavigatorStyles } from "../styles";
import ListWrapper from "../components/ListWrapper";
import GamePageWrapper from "../components/GamePageWrapper";
import CheckIn from "../components/CheckIn";

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
			<ProfileNavigator.Screen
				name="EditProfile"
				component={EditProfileWrapper}
				options={{ title: "Edit Profile" }}
			/>
			<ProfileNavigator.Screen
				name="List"
				component={ListWrapper}
				options={{
					headerShown: false,
				}}
			/>
			<ProfileNavigator.Screen
				name="GamePage"
				component={GamePageWrapper}
			/>
			<ProfileNavigator.Screen
				name="CheckIn"
				component={CheckIn}
				options={{ title: "Check In" }}
			/>
		</ProfileNavigator.Navigator>
	);
};

export default ProfileScreen;
