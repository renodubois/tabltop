import { ApolloProvider } from "@apollo/react-hooks";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Theme } from "@react-navigation/native/lib/typescript/src/types";
import React from "react";
import { StatusBar, StyleProp, TextStyle, Text } from "react-native";
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from "react-native-vector-icons/MaterialIcons";
import { initApolloClient } from "./apollo";
import ActivityScreen from "./screens/ActivityScreen";
import FeedScreen from "./screens/FeedScreen";
import NewPostScreen from "./screens/NewPostScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import { Game } from "./types";

export type StackNavigationParamsList = {
	Feed: undefined;
	CheckIn: { game: Game; userID: string };
	Profile: { userID: string };
	GameSearch: undefined;
};

const client = initApolloClient();
const Tab = createBottomTabNavigator();

const AppTheme: Theme = {
	colors: {
		primary: "#03449E",
		background: "#CBD2D9",
		card: "#ffffff",
		border: "#ffffff",
		text: "#000000",
	},
	dark: false,
};

const App = (): JSX.Element => {
	return (
		<ApolloProvider client={client}>
			<StatusBar barStyle="light-content" />
			<NavigationContainer theme={AppTheme}>
				<Tab.Navigator
					initialRouteName="Feed"
					screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
							let iconName = "";
							let useCommunityIcon = false;
							const iconStyles: StyleProp<TextStyle> = {};
							// NOTE: I really don't love these icons, but short of rolling my own icon set,
							// I can't figure out a good way to have filled/outline states that look good,
							// so I'm giving up on that for the time being, and I'll revisit it at a later date.
							if (route.name === "Feed") {
								useCommunityIcon = true;
								if (focused) {
									iconName = "home-outline";
								} else {
									iconName = "home-outline";
								}
							} else if (route.name === "Search") {
								iconName = "search";
							} else if (route.name === "NewPost") {
								if (focused) {
									iconName = "add-circle";
								} else {
									iconName = "add-circle-outline";
								}
							} else if (route.name === "Activity") {
								if (focused) {
									iconName = "notifications";
								} else {
									iconName = "notifications-none";
								}
							} else if (route.name === "Profile") {
								if (focused) {
									iconName = "person";
								} else {
									iconName = "person-outline";
								}
							}
							const iconProps = {
								name: iconName,
								size: 36,
								color: color,
								style: iconStyles,
							};
							if (useCommunityIcon) {
								return <Text>NO</Text>;
							}
							// return <Icon {...iconProps} />;
							return <Text>NO</Text>;
						},
					})}
					tabBarOptions={{ showLabel: false }}
				>
					<Tab.Screen name="Feed" component={FeedScreen} />
					<Tab.Screen name="Search" component={SearchScreen} />
					<Tab.Screen name="NewPost" component={NewPostScreen} />
					<Tab.Screen name="Activity" component={ActivityScreen} />
					<Tab.Screen name="Profile" component={ProfileScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		</ApolloProvider>
	);
};

export default () => <App />; // eslint-disable-line
