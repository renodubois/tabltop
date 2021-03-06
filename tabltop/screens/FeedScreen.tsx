import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CheckIn from "../components/CheckIn";
import Feed from "../components/Feed";
import GameSearchWrapper from "../components/GameSearchWrapper";
import { commonStackNavigatorStyles } from "../styles";
import ProfileWrapper from "../components/ProfileWrapper";
import EditProfileWrapper from "../components/EditProfileWrapper";
import GamePageWrapper from "../components/GamePageWrapper";

const FeedNavigator = createStackNavigator();
const FeedScreen = ({}) => {
	return (
		<FeedNavigator.Navigator screenOptions={commonStackNavigatorStyles}>
			<FeedNavigator.Screen name="Feed" component={Feed} />
			<FeedNavigator.Screen
				name="CheckIn"
				component={CheckIn}
				options={{ title: "Check In" }}
			/>
			<FeedNavigator.Screen
				name="GameSearch"
				component={GameSearchWrapper}
				options={{ title: "Find a game" }}
			/>
			<FeedNavigator.Screen name="Profile" component={ProfileWrapper} />
			<FeedNavigator.Screen
				name="EditProfile"
				component={EditProfileWrapper}
				options={{ title: "Edit Profile" }}
			/>
			{/* TODO: make title of this screen the same as the game name (or don't have one at all) */}
			<FeedNavigator.Screen name="GamePage" component={GamePageWrapper} />
		</FeedNavigator.Navigator>
	);
};

export default FeedScreen;
