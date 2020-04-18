import React from "react"
import { View, Text } from "react-native"
import Styles from "../styles"

interface ErrorOverlayProps {
    error?: any;
}

const ErrorOverlay = ({ error }: ErrorOverlayProps) => (
	<View style={{ alignSelf: "center", paddingTop: 20 }}>
		<Text style={Styles.searchFailureText}>
            Encountered an error: {error}
		</Text>
	</View>
)

export default ErrorOverlay
