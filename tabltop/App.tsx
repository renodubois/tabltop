import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ApolloClient from "apollo-boost";
import React from "react";
import Feed from "./containers/Feed";
import CheckIn from "./containers/CheckIn";

export type StackNavigationParamsList = {
    Feed: undefined;
    CheckIn: undefined;
};

const client = new ApolloClient({ uri: "http://localhost:4000" });
const Stack = createStackNavigator<StackNavigationParamsList>();

const App = () => {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Feed"
                    screenOptions={{ headerBackTitle: "Back" }}
                >
                    <Stack.Screen name="Feed" component={Feed} />
                    <Stack.Screen
                        name="CheckIn"
                        component={CheckIn}
                        options={{ title: "Check In" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
};

export default () => <App />;
