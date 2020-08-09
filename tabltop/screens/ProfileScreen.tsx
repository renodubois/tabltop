import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StackNavigationParamsList } from "../types";
import EditProfileWrapper from "../components/EditProfileWrapper";
import ProfileWrapper from "../components/ProfileWrapper";
import { commonStackNavigatorStyles } from "../styles";
import ListWrapper from "../components/ListWrapper";

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
			<ProfileNavigator.Screen name="List" component={ListWrapper} />
		</ProfileNavigator.Navigator>
	);
};

export default ProfileScreen;
