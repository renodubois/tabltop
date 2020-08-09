import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { commonStackNavigatorStyles } from "../styles";
import CheckIn from "../components/CheckIn";
import GameSearchWrapper from "../components/GameSearchWrapper";
import GeneralSearch from "../components/GeneralSearch";
import GamePageWrapper from "../components/GamePageWrapper";
import ProfileWrapper from "../components/ProfileWrapper";

const SearchNavigator = createStackNavigator();
const SearchScreen = ({}) => {
	return (
		<SearchNavigator.Navigator screenOptions={commonStackNavigatorStyles}>
			<SearchNavigator.Screen
				name="Search"
				component={GeneralSearch}
				options={{
					headerShown: false,
				}}
			/>
			<SearchNavigator.Screen
				name="CheckIn"
				component={CheckIn}
				options={{ title: "Check In" }}
			/>
			<SearchNavigator.Screen
				name="GameSearch"
				component={GameSearchWrapper}
				options={{ title: "Find a game" }}
			/>
			{/* TODO: make title of this screen the same as the game name (or don't have one at all) */}
			<SearchNavigator.Screen
				name="GamePage"
				component={GamePageWrapper}
			/>
			<SearchNavigator.Screen name="Profile" component={ProfileWrapper} />
		</SearchNavigator.Navigator>
	);
};

export default SearchScreen;
