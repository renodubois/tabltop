import React from "react";
import { View, Text } from "react-native";

interface ErrorOverlayProps {
    error?: any;
}

const ErrorOverlay = ({ error }: ErrorOverlayProps) => (
    <View>
        <Text>Encountered an error: {error}</Text>
    </View>
);

export default ErrorOverlay;
