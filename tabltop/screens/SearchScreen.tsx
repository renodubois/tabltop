import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { commonStackNavigatorStyles } from "../styles";
import CheckIn from "../components/CheckIn";
import GameSearchWrapper from "../components/GameSearchWrapper";

const Search = () => {
	return (
		<View>
			<Text>Search</Text>
		</View>
	);
};

const SearchNavigator = createStackNavigator();
const SearchScreen = ({}) => {
	return (
		<SearchNavigator.Navigator screenOptions={commonStackNavigatorStyles}>
			<SearchNavigator.Screen
				name="Search"
				component={Search}
				options={{
					// TODO: account for notches more automatically here
					header: (props) => (
						<View
							style={{
								padding: 20,
								paddingTop: 40,
								backgroundColor: "#1c329c"
							}}
						>
							<Text style={{ color: "white" }}>
								Search Bar Here
							</Text>
						</View>
					)
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
		</SearchNavigator.Navigator>
	);
};

export default SearchScreen;
