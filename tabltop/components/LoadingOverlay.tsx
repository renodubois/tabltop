import React from "react";
import { View, Text } from "react-native";
import Styles from "../styles";

const LoadingOverlay = (): JSX.Element => (
	<View style={{ alignSelf: "center", paddingTop: 20 }}>
		<Text style={Styles.searchFailureText} testID="loading-text">
			Loading...
		</Text>
	</View>
);

export default LoadingOverlay;
