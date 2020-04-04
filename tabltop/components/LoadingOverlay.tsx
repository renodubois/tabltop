import React from "react";
import { View, Text } from "react-native";
import Styles from "../styles";

const LoadingOverlay = ({}) => (
    <View style={{ alignSelf: "center", paddingTop: 20 }}>
        <Text style={Styles.searchFailureText}>Loading...</Text>
    </View>
);

export default LoadingOverlay;
