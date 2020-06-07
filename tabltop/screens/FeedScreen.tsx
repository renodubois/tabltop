import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CheckIn from "../components/CheckIn";
import Feed from "../components/Feed";
import GameSearchWrapper from "../components/GameSearchWrapper";
import { commonStackNavigatorStyles } from "../styles";

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
		</FeedNavigator.Navigator>
	);
};

export default FeedScreen;
