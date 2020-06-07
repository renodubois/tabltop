import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { commonStackNavigatorStyles } from "../styles";
import CheckIn from "../components/CheckIn";
import GameSearchWrapper from "../components/GameSearchWrapper";

const NewPostNavigator = createStackNavigator();
const NewPostScreen = ({}) => {
	return (
		<NewPostNavigator.Navigator
			initialRouteName="GameSearch"
			screenOptions={commonStackNavigatorStyles}
		>
			<NewPostNavigator.Screen
				name="CheckIn"
				component={CheckIn}
				options={{ title: "Check In" }}
			/>
			<NewPostNavigator.Screen
				name="GameSearch"
				component={GameSearchWrapper}
				options={{ title: "Find a game" }}
			/>
		</NewPostNavigator.Navigator>
	);
};

export default NewPostScreen;
