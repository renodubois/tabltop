import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ApolloClient from "apollo-boost";
import React from "react";
import Feed from "./components/Feed";
import CheckIn from "./components/CheckIn";
import { Theme } from "@react-navigation/native/lib/typescript/src/types";

export type StackNavigationParamsList = {
    Feed: undefined;
    CheckIn: undefined;
};

const client = new ApolloClient({ uri: "http://localhost:4000" });
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

const App = () => {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer theme={AppTheme}>
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
