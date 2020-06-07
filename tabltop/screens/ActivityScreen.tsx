import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { commonStackNavigatorStyles } from "../styles";

const Activity = () => {
	return (
		<View>
			<Text>Activity</Text>
		</View>
	);
};

const ActivityNavigator = createStackNavigator();

const ActivityScreen = ({}) => {
	return (
		<ActivityNavigator.Navigator screenOptions={commonStackNavigatorStyles}>
			<ActivityNavigator.Screen name="Activity" component={Activity} />
		</ActivityNavigator.Navigator>
	);
};

export default ActivityScreen;
