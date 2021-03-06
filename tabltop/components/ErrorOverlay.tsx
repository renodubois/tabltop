import React from "react";
import { View, Text } from "react-native";
import Styles from "../styles";
import { ApolloError } from "apollo-client";

interface ErrorOverlayProps {
	error?: string | ApolloError;
}

const ErrorOverlay = ({ error }: ErrorOverlayProps): JSX.Element => {
	if (typeof error !== "string") {
		console.error(error);
		error = "Some other error that wasn't a string";
	}
	return (
		<View style={{ alignSelf: "center", paddingTop: 20 }}>
			<Text style={Styles.searchFailureText}>
				Encountered an error: {error}
			</Text>
		</View>
	);
};

export default ErrorOverlay;
