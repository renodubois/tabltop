import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StackNavigationParamsList } from "../App";
import EditProfileWrapper from "../components/EditProfileWrapper";
import ProfileWrapper from "../components/ProfileWrapper";
import { commonStackNavigatorStyles } from "../styles";

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
		</ProfileNavigator.Navigator>
	);
};

export default ProfileScreen;
