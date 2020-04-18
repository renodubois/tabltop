import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Feed from "./components/Feed";
import CheckIn from "./components/CheckIn";
import { Theme } from "@react-navigation/native/lib/typescript/src/types";
import { StatusBar } from "react-native";
import GameSearchWrapper from "./components/GameSearchWrapper";
import { Game } from "./types";
import { initApolloClient } from "./apollo";

export type StackNavigationParamsList = {
	Feed: undefined;
	CheckIn: { game: Game };
	GameSearch: undefined;
};

const client = initApolloClient();
const Stack = createStackNavigator<StackNavigationParamsList>();

const AppTheme: Theme = {
	colors: {
		primary: "#03449E",
		background: "#CBD2D9",
		card: "#ffffff",
		border: "#ffffff",
		text: "#000000"
	},
	dark: false
};

const App = (): JSX.Element => {
	return (
		<ApolloProvider client={client}>
			<StatusBar barStyle="light-content" />
			<NavigationContainer theme={AppTheme}>
				<Stack.Navigator
					initialRouteName="Feed"
					screenOptions={{
						headerBackTitle: "Back",
						headerStyle: {
							backgroundColor: "#1c329c"
						},
						headerTintColor: "#ffffff"
					}}
				>
					<Stack.Screen name="Feed" component={Feed} />
					<Stack.Screen
						name="CheckIn"
						component={CheckIn}
						options={{ title: "Check In" }}
					/>
					<Stack.Screen
						name="GameSearch"
						component={GameSearchWrapper}
						options={{ title: "Find a game" }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ApolloProvider>
	);
};

export default () => <App />; // eslint-disable-line
